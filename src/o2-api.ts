import { createHttpClient, get, post, put } from './http';
import { encodeSessionActions, TradeAccountManager } from './signing';
import type { MarketResponse, SessionAction, SessionSubmitTransactionResponse, MarketsResponse } from './types';

export function createO2Client(baseURL: string) {
  const client = createHttpClient(baseURL);

  return {
    client,
    getMarkets: () => get<MarketsResponse>(client, '/v1/markets'),
    getSummary: (market_id: string) => get<any>(client, '/v1/markets/summary', { market_id }),
    getTicker: (market_id: string) => get<any>(client, '/v1/markets/ticker', { market_id }),
    getDepth: (market_id: string, precision = '0') => get<any>(client, '/v1/depth', { market_id, precision }),
    getTrades: (market_id: string, direction: 'asc' | 'desc' = 'desc', count = 50) =>
      get<any>(client, '/v1/trades', { market_id, direction, count }),
    getTradesByAccount: (params: {
      market_id: string;
      account?: string;
      contract?: string;
      direction?: 'asc' | 'desc';
      count?: number;
      start_timestamp?: number;
      start_trade_id?: string;
    }) =>
      get<any>(client, '/v1/trades_by_account', {
        direction: 'desc',
        count: 50,
        ...params,
      }),
    getBars: (market_id: string, resolution: string, to: number, countBackOrFrom: number, useCountBack = true) =>
      get<any>(client, '/v1/bars', useCountBack
        ? { market_id, resolution, to, count_back: countBackOrFrom, from: to }
        : { market_id, resolution, to, from: countBackOrFrom }),
    getOrders: (params: {
      market_id: string;
      account?: string;
      contract?: string;
      direction?: 'asc' | 'desc';
      count?: number;
      is_open?: boolean;
      start_timestamp?: number;
      start_order_id?: string;
    }, ownerId?: string) =>
      get<any>(client, '/v1/orders', { direction: 'desc', count: 50, ...params }, ownerId),
    getOrder: (market_id: string, order_id: string, ownerId?: string) =>
      get<any>(client, '/v1/order', { market_id, order_id }, ownerId),
    getAccounts: (ownerId: string) => get<any>(client, '/v1/accounts', { owner: ownerId }, ownerId),
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
        // encodeSessionActions now returns the full signed payload directly
        const payload = await encodeSessionActions(manager, market.contract_id, actions, market);

        const response = await post<SessionSubmitTransactionResponse>(
          client,
          '/v1/session/actions',
          {
            actions: [
              {
                market_id: market.market_id,
                actions: payload.actions,
              },
            ],
            signature: payload.signature,
            nonce: payload.nonce,
            trade_account_id: payload.trade_account_id,
            session_id: payload.session_id,
            variable_outputs: payload.variable_outputs,
            collect_orders: false,
          },
          ownerId
        );

        manager.incrementNonce();
        return response;
      } catch (err: any) {
        console.error('Session actions failed:', err?.response?.data || err?.message || err);
        try {
          await manager.fetchNonce();
        } catch { }
        return null;
      }
    },
  };
}
