import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { OrderBook } from './OrderBook';
export declare class OrderBookFactory extends __ContractFactory<OrderBook> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<OrderBook>>;
}
//# sourceMappingURL=OrderBookFactory.d.ts.map