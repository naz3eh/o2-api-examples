import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBookProxy } from './OrderBookProxy';
export declare class OrderBookProxyFactory extends __ContractFactory<OrderBookProxy> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBookProxy>>;
}
//# sourceMappingURL=OrderBookProxyFactory.d.ts.map