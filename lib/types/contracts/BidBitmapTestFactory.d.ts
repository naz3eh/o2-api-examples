import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { BidBitmapTest } from './BidBitmapTest';
export declare class BidBitmapTestFactory extends __ContractFactory<BidBitmapTest> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<BidBitmapTest>>;
}
//# sourceMappingURL=BidBitmapTestFactory.d.ts.map