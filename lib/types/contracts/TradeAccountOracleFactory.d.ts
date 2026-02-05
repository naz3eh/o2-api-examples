import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { TradeAccountOracle } from './TradeAccountOracle';
export declare class TradeAccountOracleFactory extends __ContractFactory<TradeAccountOracle> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<TradeAccountOracle>>;
}
//# sourceMappingURL=TradeAccountOracleFactory.d.ts.map