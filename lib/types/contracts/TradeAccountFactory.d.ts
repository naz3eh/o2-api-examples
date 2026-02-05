import { ContractFactory as __ContractFactory } from 'fuels';
import type { Provider, Account, DeployContractOptions } from 'fuels';
import { TradeAccount } from './TradeAccount';
export declare class TradeAccountFactory extends __ContractFactory<TradeAccount> {
    static readonly bytecode: Uint8Array<ArrayBufferLike>;
    constructor(accountOrProvider: Account | Provider);
    static deploy(wallet: Account, options?: DeployContractOptions): Promise<import("fuels").DeployContractResult<TradeAccount>>;
}
//# sourceMappingURL=TradeAccountFactory.d.ts.map