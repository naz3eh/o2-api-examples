#!/usr/bin/env node
import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Provider, Wallet } from 'fuels';

import { createO2Client } from '../src/o2-api';
import {
  resolveBaseUrl,
  resolveWsUrl,
  resolveProviderUrl,
  resolveSessionExpiryMs,
  type Network,
} from '../src/config';
import {
  OrderSide,
  OrderType,
  type MarketResponse,
  type SessionAction,
} from '../src/types';
import {
  ensureMainnetConfirmation,
  logSection,
  pickMarkets,
  pickTinyOrderPrice,
} from '../src/utils';
import { createSessionSigner, TradeAccountManager } from '../src/signing';

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('network', { choices: ['mainnet', 'testnet'], default: 'mainnet' })
    .option('execute-trades', { type: 'boolean', default: false })
    .option('confirm-mainnet', { type: 'boolean', default: false })
    .option('allow-destructive', { type: 'boolean', default: false })
    .option('markets', { type: 'string' })
    .parse();

  const network = argv.network as Network;
  const executeTrades = Boolean((argv as any).executeTrades ?? (argv as any)['execute-trades']);
  const confirmMainnet = Boolean((argv as any).confirmMainnet ?? (argv as any)['confirm-mainnet']);
  const allowDestructive = Boolean((argv as any).allowDestructive ?? (argv as any)['allow-destructive']);
  const marketsOverride = argv.markets as string | undefined;

  ensureMainnetConfirmation(network, executeTrades, confirmMainnet);

  const baseURL = resolveBaseUrl(network);
  const wsURL = resolveWsUrl(network);
  const providerURL = resolveProviderUrl(network);
  const sessionExpiryMs = resolveSessionExpiryMs();

  const ownerPrivateKey = process.env.O2_OWNER_PRIVATE_KEY;
  const ownerAddressFromEnv = process.env.O2_OWNER_ADDRESS;

  const o2 = createO2Client(baseURL);

  logSection('Config');
  console.log({ baseURL, wsURL, providerURL, network, executeTrades, allowDestructive });

  // ---------------------------
  // Market Data
  // ---------------------------
  logSection('Market Data');
  const marketsResp = await o2.getMarkets();
  console.log(`Markets: ${marketsResp.markets.length}`);
  const selectedMarkets = pickMarkets(marketsResp.markets, marketsOverride);

  const summary = await o2.getSummary(selectedMarkets[0].market_id);
  console.log('Summary keys:', Object.keys(summary || {}).length);

  const ticker = await o2.getTicker(selectedMarkets[0].market_id);
  console.log('Ticker keys:', Object.keys(ticker || {}).length);


  // ---------------------------
  // Depth
  // ---------------------------
  logSection('Order Book Depth');
  const depthA = await o2.getDepth('0xfbf8e5c78071815183147bf8ed4275f43933941b792b7b6fd22f9f2810beb667', '0');
  console.log('Depth A best bid:', depthA?.orders?.buys?.[0]?.price);


  // ---------------------------
  // Trading Data
  // ---------------------------
  logSection('Trading Data');
  const trades = await o2.getTrades(selectedMarkets[0].market_id, 'desc', 50);
  console.log('Trades sample count:', trades?.trades?.length ?? 0);

  const bars = await o2.getBars(selectedMarkets[0].market_id, '1m', Date.now(), 10);
  console.log('Bars sample count:', bars?.bars?.length ?? 0);

  // ---------------------------
  // Aggregator Endpoints
  // ---------------------------
  logSection('Aggregator Endpoints');
  const marketPair = process.env.O2_MARKET_PAIR || `${selectedMarkets[0].base.symbol}_${selectedMarkets[0].quote.symbol}`;

  const aggAssets = await o2.aggregatedAssets();
  console.log('Aggregated assets keys:', Object.keys(aggAssets || {}).length);

  const aggOrderbook = await o2.aggregatedOrderbook(marketPair);
  console.log('Aggregated orderbook keys:', Object.keys(aggOrderbook || {}).length);

  const aggSummary = await o2.aggregatedSummary();
  console.log('Aggregated summary keys:', Object.keys(aggSummary || {}).length);

  const aggTicker = await o2.aggregatedTicker();
  console.log('Aggregated ticker keys:', Object.keys(aggTicker || {}).length);

  const aggTrades = await o2.aggregatedTrades(marketPair);
  console.log('Aggregated trades keys:', Object.keys(aggTrades || {}).length);

  // ---------------------------
  // Authenticated / Session / Trading
  // ---------------------------
  if (!ownerPrivateKey) {
    logSection('Auth / Trading');
    console.log('No O2_OWNER_PRIVATE_KEY set. Skipping account/session/trading endpoints.');
    return;
  }

  const provider = new Provider(providerURL);
  const wallet = Wallet.fromPrivateKey(ownerPrivateKey, provider);
  const ownerAddress = ownerAddressFromEnv || wallet.address.toB256();

  logSection('Account & Balance');
  let tradeAccountId: string | undefined;

  try {
    const accountInfo = await o2.getAccounts(ownerAddress);
    tradeAccountId = accountInfo?.trade_account_id;
    console.log('Account info fetched');
  } catch (err) {
    console.log('GET /v1/accounts failed (may require trade_account_id).');
  }

  if (!tradeAccountId && allowDestructive) {
    const created = await o2.createAccount(ownerAddress);
    tradeAccountId = created.trade_account_id;
    console.log('Created trade account:', tradeAccountId);
  } else if (!tradeAccountId) {
    console.log('No trade account id available. Use --allow-destructive to create one.');
  }

  if (tradeAccountId) {
    console.log('Trading account id:', tradeAccountId);
    const balance = await o2.getBalance(tradeAccountId, selectedMarkets[0].quote.asset);
    console.log('Trading account balance:', balance?.trading_account_balance ?? 'n/a');
  }

  // ---------------------------
  // Session Creation
  // ---------------------------
  let manager: TradeAccountManager | null = null;

  if (tradeAccountId) {
    logSection('Session Creation');
    const signer = createSessionSigner();
    manager = new TradeAccountManager({
      signer,
      account: wallet,
      tradeAccountId: tradeAccountId as any,
      contractIds: [selectedMarkets[0].contract_id, selectedMarkets[1].contract_id],
    });

    await manager.fetchNonce();

    // Always create a new session with the new signer (like api-bot does)
    // Recovery would only work if we persisted the signer's private key
    const sessionParams = await manager.api_CreateSessionParams(
      [selectedMarkets[0].contract_id, selectedMarkets[1].contract_id],
      Date.now() + sessionExpiryMs
    );
    const session = await o2.createSession(sessionParams, ownerAddress);
    manager.setSession(session);
    manager.incrementNonce();
    console.log('Created new session');
  }

  // ---------------------------
  // Order Management & Trading
  // ---------------------------
  if (executeTrades && manager && tradeAccountId) {
    logSection('Trading (Create + Cancel)');

    const actionsA: SessionAction[] = [
      {
        CreateOrder: {
          side: OrderSide.Buy,
          order_type: OrderType.Spot,
          price: pickTinyOrderPrice(depthA, OrderSide.Buy).toString(),
          quantity: selectedMarkets[0].min_order || '1',
        },
      },
    ];

    const respA = await o2.submitSessionActions(manager, ownerAddress, selectedMarkets[0], actionsA);

    const orderIds = [
      ...(respA?.orders?.map((o) => o.order_id) || []),
    ];

    console.log('Created orders:', orderIds);

    if (orderIds.length > 0) {
      const cancelActions: SessionAction[] = orderIds.map((id) => ({
        CancelOrder: { order_id: id as `0x${string}` },
      }));

      // Cancel only first 5 (max actions per tx)
      await o2.submitSessionActions(manager, ownerAddress, selectedMarkets[0], cancelActions.slice(0, 5));
      console.log('Canceled orders');
    }
  } else {
    logSection('Trading');
    console.log('Skipping trades (missing --execute-trades or session setup).');
  }

  // ---------------------------
  // Orders
  // ---------------------------
  logSection('Orders');
  const openOrders = await o2.getOrders(
    {
      market_id: selectedMarkets[0].market_id,
      contract: tradeAccountId ?? undefined,
      account: tradeAccountId ? undefined : ownerAddress,
      direction: 'desc',
      count: 50,
      is_open: true,
    },
    ownerAddress
  );
  console.log('Orders count:', openOrders?.orders?.length ?? 0);

  if (openOrders?.orders?.[0]?.order_id) {
    const order = await o2.getOrder(selectedMarkets[0].market_id, openOrders.orders[0].order_id, ownerAddress);
    console.log('Order detail:', order?.order_id ?? 'n/a');
  }

  // ---------------------------
  // Account Operations (gated)
  // ---------------------------
  logSection('Account Operations');
  if (!allowDestructive) {
    console.log('Skipping withdraw/upgrade/call endpoints (use --allow-destructive).');
  } else if (!tradeAccountId) {
    console.log('No trade account id; cannot run account ops.');
  } else {
    console.log('Account ops are enabled. Add real params before use.');
  }

  logSection('Done');
  console.log('WS endpoint:', wsURL);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
