import { readFileSync } from 'node:fs';

const ABI_DIR = new URL('../abis/', import.meta.url);

function loadAbi(name: string) {
  const path = new URL(name, ABI_DIR);
  return JSON.parse(readFileSync(path, 'utf8'));
}

export const TRADE_ACCOUNT_ABI = loadAbi('trade-account-abi.json');
export const ORDER_BOOK_ABI = loadAbi('order-book-abi.json');
