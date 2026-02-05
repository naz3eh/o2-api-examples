import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { MaxHeapTest } from './MaxHeapTest';
export declare class MaxHeapTestFactory extends __ContractFactory<MaxHeapTest> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<MaxHeapTest>>;
}
//# sourceMappingURL=MaxHeapTestFactory.d.ts.map