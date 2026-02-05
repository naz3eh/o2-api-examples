import { Address, B256Address, FunctionInvocationScope, BN, AbstractContract } from 'fuels';
import type { OrderBook } from '../../types/contracts/OrderBook';
import type { IdentityInput } from '../../types/contracts/TradeAccount';
import type { BigInterish, OrderBookConfig, SessionAction } from '../types';
import { Identity } from '../../types';
export declare function createCallToSign(nonce: BigInterish, chainId: BigInterish, invocationScope: FunctionInvocationScope<any>): Uint8Array<ArrayBufferLike>;
export declare function encodeActions(tradeAccountIdentity: IdentityInput, orderBook: OrderBook, orderBookConfig: OrderBookConfig, actions: SessionAction[] | undefined, gasLimit: BN): Promise<{
    invokeScopes: Array<FunctionInvocationScope<any>>;
    actions: SessionAction[];
}>;
export declare function getContract(bits: B256Address | Address): {
    ContractId: {
        bits: string;
    };
};
export declare function getAddress(bits: B256Address | Address): {
    Address: {
        bits: string;
    };
};
export declare function createCallContractArg(invocationScope: FunctionInvocationScope<any>, gasLimit: BN): {
    contracts: AbstractContract[];
    callContractArgBytes: Uint8Array<ArrayBufferLike>;
    callContractArg: {
        contract_id: {
            bits: string;
        };
        function_selector: Uint8Array<ArrayBufferLike>;
        call_params: {
            coins: BN;
            asset_id: {
                bits: string;
            };
            gas: string;
        };
        call_data: Uint8Array<ArrayBufferLike>;
    };
    variableOutputs: number;
};
export declare function removeBits(data: any, convertToHex?: boolean): any;
export declare function identityInputToIdentity(identityInput: IdentityInput): Identity;
export declare function hexPad(hex?: string | null | undefined): `0x${string}` | null;
//# sourceMappingURL=o2-encoders.d.ts.map