import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBookRegistryProxy } from './OrderBookRegistryProxy';
export declare class OrderBookRegistryProxyFactory extends __ContractFactory<OrderBookRegistryProxy> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBookRegistryProxy>>;
}
//# sourceMappingURL=OrderBookRegistryProxyFactory.d.ts.map