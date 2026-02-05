import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { AskBitmapTest } from './AskBitmapTest';
export declare class AskBitmapTestFactory extends __ContractFactory<AskBitmapTest> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<AskBitmapTest>>;
}
//# sourceMappingURL=AskBitmapTestFactory.d.ts.map