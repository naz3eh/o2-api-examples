import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { LargeContract } from './LargeContract';
export declare class LargeContractFactory extends __ContractFactory<LargeContract> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<LargeContract>>;
}
//# sourceMappingURL=LargeContractFactory.d.ts.map