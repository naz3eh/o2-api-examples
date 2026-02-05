import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { TradeAccountProxy } from './TradeAccountProxy';
export declare class TradeAccountProxyFactory extends __ContractFactory<TradeAccountProxy> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<TradeAccountProxy>>;
}
//# sourceMappingURL=TradeAccountProxyFactory.d.ts.map