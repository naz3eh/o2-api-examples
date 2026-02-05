import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBookBlacklist } from './OrderBookBlacklist';
export declare class OrderBookBlacklistFactory extends __ContractFactory<OrderBookBlacklist> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBookBlacklist>>;
}
//# sourceMappingURL=OrderBookBlacklistFactory.d.ts.map