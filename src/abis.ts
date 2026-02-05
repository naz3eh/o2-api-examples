// Re-export types from lib for use in signing and o2-api
import { TradeAccount } from '../lib/types/contracts/TradeAccount';
import { OrderBook } from '../lib/types/contracts/OrderBook';

export { TradeAccount, OrderBook };

// Export the ABI objects for backwards compatibility
export const TRADE_ACCOUNT_ABI = (TradeAccount as any).abi;
export const ORDER_BOOK_ABI = (OrderBook as any).abi;
