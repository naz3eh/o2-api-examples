import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { TradeAccountRegistryProxy } from './TradeAccountRegistryProxy';
export declare class TradeAccountRegistryProxyFactory extends __ContractFactory<TradeAccountRegistryProxy> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<TradeAccountRegistryProxy>>;
}
//# sourceMappingURL=TradeAccountRegistryProxyFactory.d.ts.map