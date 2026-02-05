import { Account, BN, Address, FunctionInvocationScope } from 'fuels';
import { TradeAccount } from '../types';
import { BigInterish, API_CreateSessionRequest, SessionSigner, TradeAccountManagerConfig, API_SessionCallContractRequest } from './types';
import { IdentityInput, SessionInput } from '../types/contracts/TradeAccount';
export declare class TradeAccountManager {
    readonly account: Account;
    readonly signer: SessionSigner;
    readonly contract: TradeAccount;
    readonly defaultGasLimit: BN;
    private _nonce;
    private session;
    constructor(config: TradeAccountManagerConfig);
    get nonce(): BN;
    get contractId(): Address;
    get identity(): IdentityInput;
    get signerAddress(): Address;
    get signerIdentity(): IdentityInput;
    get ownerAddress(): Address;
    recoverSession(): Promise<SessionInput>;
    setSession(session: SessionInput): void;
    fetchNonce(): Promise<BN>;
    setNonce(nonce: BigInterish): void;
    incrementNonce(): BN;
    signBytesWithSession(bytes: Uint8Array, length?: number): Promise<import("../types/contracts/TradeAccount").SignatureInput>;
    api_CreateSessionParams(contract_ids: string[], expiry?: BigInterish): Promise<API_CreateSessionRequest>;
    api_SessionCallContractsParams(invocationScopes: Array<FunctionInvocationScope<any>>): Promise<API_SessionCallContractRequest>;
}
//# sourceMappingURL=trade-account.d.ts.map