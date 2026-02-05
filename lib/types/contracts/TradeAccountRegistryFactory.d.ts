import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { TradeAccountRegistry } from './TradeAccountRegistry';
export declare class TradeAccountRegistryFactory extends __ContractFactory<TradeAccountRegistry> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<TradeAccountRegistry>>;
}
//# sourceMappingURL=TradeAccountRegistryFactory.d.ts.map