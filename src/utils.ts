import { OrderSide, MarketResponse } from './types';

export function logSection(title: string) {
  console.log(`\n=== ${title} ===`);
}

export function pickMarkets(markets: MarketResponse[], override?: string): MarketResponse[] {
  if (override) {
    const ids = override.split(',').map((id) => id.trim());
    const selected = markets.filter((m) => ids.includes(m.market_id));
    if (selected.length === 0) {
      throw new Error('No valid market IDs found with --markets');
    }
    return selected;
  }
  if (markets.length === 0) throw new Error('Need at least one market from /v1/markets');
  // Return up to 2 markets if available, but at least 1
  return markets.slice(0, 2);
}

export function ensureMainnetConfirmation(network: string, executeTrades: boolean, confirmMainnet: boolean) {
  if (network === 'mainnet' && executeTrades && !confirmMainnet) {
    throw new Error('Refusing to trade on mainnet without --confirm-mainnet');
  }
}

export function toSafeBigInt(value: string | number | bigint): bigint {
  try {
    return BigInt(value);
  } catch {
    return 1n;
  }
}

export function pickTinyOrderPrice(depth: any, side: OrderSide): bigint {
  const bestBid = depth?.orders?.buys?.[0]?.price;
  const bestAsk = depth?.orders?.sells?.[0]?.price;
  if (side === OrderSide.Buy && bestBid) {
    const v = toSafeBigInt(bestBid);
    return v > 1n ? v / 2n : 1n;
  }
  if (side === OrderSide.Sell && bestAsk) {
    const v = toSafeBigInt(bestAsk);
    return v > 1n ? v * 2n : 1n;
  }
  return 1n;
}
