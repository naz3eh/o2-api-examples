import { Contract, B256Address } from 'fuels';

import { createHttpClient, get, post, put } from './http';
import { encodeSessionActions, TradeAccountManager } from './signing';
import { ORDER_BOOK_ABI } from './abis';
import type { MarketResponse, SessionAction, SessionSubmitTransactionResponse, MarketsResponse } from './types';

export function createO2Client(baseURL: string) {
  const client = createHttpClient(baseURL);

  return {
    client,
    getMarkets: () => get<MarketsResponse>(client, '/v1/markets'),
    getSummary: () => get<any>(client, '/v1/markets/summary'),
    getTicker: () => get<any>(client, '/v1/markets/ticker'),
    getDepth: (market_id: string, precision = '0') => get<any>(client, '/v1/depth', { market_id, precision }),
    getTrades: (market_id: string) => get<any>(client, '/v1/trades', { market_id }),
    getBars: (market_id: string, interval = '1m', limit = 10) => get<any>(client, '/v1/bars', { market_id, interval, limit }),
    getOrders: (market_id: string, ownerId?: string) => get<any>(client, '/v1/orders', { market_id }, ownerId),
    getOrder: (order_id: string, ownerId?: string) => get<any>(client, '/v1/order', { order_id }, ownerId),
    getAccounts: (ownerId: string) => get<any>(client, '/v1/accounts', undefined, ownerId),
    createAccount: (ownerId: string) => post<any>(client, '/v1/accounts', { identity: { Address: ownerId } }, ownerId),
    getBalance: (contract: string, asset_id: string) => get<any>(client, '/v1/balance', { contract, asset_id }),
    createSession: (params: any, ownerId: string) => put<any>(client, '/v1/session', params, ownerId),
    aggregatedAssets: () => get<any>(client, '/v1/aggregated/assets'),
    aggregatedOrderbook: (market_pair: string) => get<any>(client, '/v1/aggregated/orderbook', { market_pair }),
    aggregatedSummary: () => get<any>(client, '/v1/aggregated/summary'),
    aggregatedTicker: () => get<any>(client, '/v1/aggregated/ticker'),
    aggregatedTrades: (market_pair: string) => get<any>(client, '/v1/aggregated/trades', { market_pair }),
    submitSessionActions: async (
      manager: TradeAccountManager,
      ownerId: string,
      market: MarketResponse,
      actions: SessionAction[]
    ): Promise<SessionSubmitTransactionResponse | null> => {
      try {
        const orderBook = new Contract(market.contract_id as B256Address, ORDER_BOOK_ABI as any, manager.account);
        const encoded = await encodeSessionActions(manager, orderBook, actions, market);

        const payload = await manager.api_SessionCallContractsParams(encoded.invokeScopes);

        const response = await post<SessionSubmitTransactionResponse>(
          client,
          '/v1/session/actions',
          {
            actions: [
              {
                market_id: market.market_id,
                actions: encoded.actions,
              },
            ],
            signature: payload.signature,
            nonce: payload.nonce,
            trade_account_id: payload.trade_account_id,
            session_id: payload.session_id,
            variable_outputs: payload.variable_outputs,
            min_gas_limit: payload.min_gas_limit,
            collect_orders: true,
          },
          ownerId
        );

        manager.incrementNonce();
        return response;
      } catch (err) {
        console.error('Session actions failed:', err);
        try {
          await manager.fetchNonce();
        } catch {}
        return null;
      }
    },
  };
}
