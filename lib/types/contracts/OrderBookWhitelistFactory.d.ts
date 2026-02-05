import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBookWhitelist } from './OrderBookWhitelist';
export declare class OrderBookWhitelistFactory extends __ContractFactory<OrderBookWhitelist> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBookWhitelist>>;
}
//# sourceMappingURL=OrderBookWhitelistFactory.d.ts.map