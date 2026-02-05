import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBookRegistry } from './OrderBookRegistry';
export declare class OrderBookRegistryFactory extends __ContractFactory<OrderBookRegistry> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBookRegistry>>;
}
//# sourceMappingURL=OrderBookRegistryFactory.d.ts.map