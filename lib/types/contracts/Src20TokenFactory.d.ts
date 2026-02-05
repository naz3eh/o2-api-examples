import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { Src20Token } from './Src20Token';
export declare class Src20TokenFactory extends __ContractFactory<Src20Token> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<Src20Token>>;
}
//# sourceMappingURL=Src20TokenFactory.d.ts.map