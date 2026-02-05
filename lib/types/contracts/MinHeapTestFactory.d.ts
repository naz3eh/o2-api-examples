import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { MinHeapTest } from './MinHeapTest';
export declare class MinHeapTestFactory extends __ContractFactory<MinHeapTest> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<MinHeapTest>>;
}
//# sourceMappingURL=MinHeapTestFactory.d.ts.map