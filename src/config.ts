export const MAINNET_API_BASE = 'https://api.o2.app';
export const TESTNET_API_BASE = 'https://api.testnet.o2.app';

export const MAINNET_WS_BASE = 'wss://api.o2.app/v1/ws';
export const TESTNET_WS_BASE = 'wss://api.testnet.o2.app/v1/ws';

export const MAINNET_PROVIDER_URL = 'https://mainnet.fuel.network/v1/graphql';
export const TESTNET_PROVIDER_URL = 'https://beta-4.fuel.network/graphql';

export const DEFAULT_SESSION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export type Network = 'mainnet' | 'testnet';

export function resolveBaseUrl(network: Network) {
  return process.env.O2_API_BASE || (network === 'mainnet' ? MAINNET_API_BASE : TESTNET_API_BASE);
}

export function resolveWsUrl(network: Network) {
  return process.env.O2_WS_BASE || (network === 'mainnet' ? MAINNET_WS_BASE : TESTNET_WS_BASE);
}

export function resolveProviderUrl(network: Network) {
  return process.env.FUEL_PROVIDER_URL || (network === 'mainnet' ? MAINNET_PROVIDER_URL : TESTNET_PROVIDER_URL);
}

export function resolveSessionExpiryMs() {
  return process.env.O2_SESSION_EXPIRY_MS ? Number(process.env.O2_SESSION_EXPIRY_MS) : DEFAULT_SESSION_EXPIRY_MS;
}
