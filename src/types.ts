export type Identity = { Address?: string; ContractId?: string };

export type MarketResponse = {
  market_id: string;
  contract_id: string;
  taker_fee: string;
  maker_fee: string;
  min_order: string;
  dust: string;
  base: {
    symbol: string;
    asset: string;
    decimals: number;
    min_precision: number;
    max_precision: number;
  };
  quote: {
    symbol: string;
    asset: string;
    decimals: number;
    min_precision: number;
    max_precision: number;
  };
};

export type MarketsResponse = { markets: MarketResponse[] };

export enum OrderType {
  Spot = 'Spot',
  Market = 'Market',
  Limit = 'Limit',
  FillOrKill = 'FillOrKill',
  PostOnly = 'PostOnly',
}

export enum OrderSide {
  Buy = 'Buy',
  Sell = 'Sell',
}

export type SessionAction =
  | { CreateOrder: { side: OrderSide; order_type: OrderType; price: string; quantity: string } }
  | { CancelOrder: { order_id: `0x${string}` } }
  | { SettleBalance: { to: Identity } };

export type SessionSubmitTransactionResponse = {
  orders: { order_id: string }[];
  tx_id: string;
};

export type API_CreateSessionRequest = {
  nonce: string;
  contract_id: string;
  session_id: Identity;
  contract_ids: string[];
  signature: { Secp256k1: string };
  expiry: string;
};

export type API_SessionCallContractRequest = {
  nonce: string;
  session_id: string;
  trade_account_id: string;
  signature: string;
  calls: Array<{
    contract_id: string;
    function_selector: string;
    call_params: { coins: string; asset_id: string; gas: string };
    call_data?: string;
  }>;
  variable_outputs: number;
  min_gas_limit?: string;
};
