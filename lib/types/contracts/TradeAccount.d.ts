import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, Bytes, FunctionFragment, InvokeFunction, StdString } from 'fuels';
import type { Option, Enum, Vec } from './common';
export type IdentityInput = Enum<{
    Address: AddressInput;
    ContractId: ContractIdInput;
}>;
export type IdentityOutput = Enum<{
    Address: AddressOutput;
    ContractId: ContractIdOutput;
}>;
export type SignatureInput = Enum<{
    Secp256k1: Secp256k1Input;
    Secp256r1: Secp256r1Input;
    Ed25519: Ed25519Input;
}>;
export type SignatureOutput = Enum<{
    Secp256k1: Secp256k1Output;
    Secp256r1: Secp256r1Output;
    Ed25519: Ed25519Output;
}>;
export type AddressInput = {
    bits: string;
};
export type AddressOutput = AddressInput;
export type AssetIdInput = {
    bits: string;
};
export type AssetIdOutput = AssetIdInput;
export type CallContractArgInput = {
    contract_id: ContractIdInput;
    function_selector: Bytes;
    call_params: CallParamsInput;
    call_data: Option<Bytes>;
};
export type CallContractArgOutput = {
    contract_id: ContractIdOutput;
    function_selector: Bytes;
    call_params: CallParamsOutput;
    call_data: Option<Bytes>;
};
export type CallParamsInput = {
    coins: BigNumberish;
    asset_id: AssetIdInput;
    gas: BigNumberish;
};
export type CallParamsOutput = {
    coins: BN;
    asset_id: AssetIdOutput;
    gas: BN;
};
export type ContractIdInput = {
    bits: string;
};
export type ContractIdOutput = ContractIdInput;
export type Ed25519Input = {
    bits: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ];
};
export type Ed25519Output = {
    bits: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
};
export type FailedToValidateEventInput = {
    account: IdentityInput;
    reason: StdString;
    timestamp: TimeInput;
};
export type FailedToValidateEventOutput = {
    account: IdentityOutput;
    reason: StdString;
    timestamp: TimeOutput;
};
export type IncrementNonceEventInput = {
    nonce: BigNumberish;
};
export type IncrementNonceEventOutput = {
    nonce: BN;
};
export type Secp256k1Input = {
    bits: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ];
};
export type Secp256k1Output = {
    bits: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
};
export type Secp256r1Input = {
    bits: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ];
};
export type Secp256r1Output = {
    bits: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
};
export type SessionInput = {
    session_id: IdentityInput;
    expiry: TimeInput;
    contract_ids: Vec<ContractIdInput>;
};
export type SessionOutput = {
    session_id: IdentityOutput;
    expiry: TimeOutput;
    contract_ids: Vec<ContractIdOutput>;
};
export type SessionContractCallEventInput = {
    session_id: IdentityInput;
    called_contract: ContractIdInput;
    nonce: BigNumberish;
};
export type SessionContractCallEventOutput = {
    session_id: IdentityOutput;
    called_contract: ContractIdOutput;
    nonce: BN;
};
export type SessionCreatedEventInput = {
    account: IdentityInput;
    session: SessionInput;
};
export type SessionCreatedEventOutput = {
    account: IdentityOutput;
    session: SessionOutput;
};
export type SessionRevokedEventInput = {
    account: IdentityInput;
    session_id: IdentityInput;
};
export type SessionRevokedEventOutput = {
    account: IdentityOutput;
    session_id: IdentityOutput;
};
export type TimeInput = {
    unix: BigNumberish;
};
export type TimeOutput = {
    unix: BN;
};
export type WithdrawEventInput = {
    account: IdentityInput;
    to: IdentityInput;
    amount: BigNumberish;
    asset_id: AssetIdInput;
    timestamp: TimeInput;
};
export type WithdrawEventOutput = {
    account: IdentityOutput;
    to: IdentityOutput;
    amount: BN;
    asset_id: AssetIdOutput;
    timestamp: TimeOutput;
};
export declare class TradeAccountInterface extends Interface {
    constructor();
    functions: {
        call_contract: FunctionFragment;
        call_contracts: FunctionFragment;
        get_current_session: FunctionFragment;
        get_nonce: FunctionFragment;
        session_call_contract: FunctionFragment;
        session_call_contracts: FunctionFragment;
        set_session: FunctionFragment;
        validate_session: FunctionFragment;
        withdraw: FunctionFragment;
    };
}
export declare class TradeAccount extends __Contract {
    static readonly abi: {
        programType: string;
        specVersion: string;
        encodingVersion: string;
        concreteTypes: ({
            type: string;
            concreteTypeId: string;
            metadataTypeId?: undefined;
            typeArguments?: undefined;
        } | {
            type: string;
            concreteTypeId: string;
            metadataTypeId: number;
            typeArguments?: undefined;
        } | {
            type: string;
            concreteTypeId: string;
            metadataTypeId: number;
            typeArguments: string[];
        })[];
        metadataTypes: ({
            type: string;
            metadataTypeId: number;
            components?: undefined;
            typeParameters?: undefined;
        } | {
            type: string;
            metadataTypeId: number;
            components: ({
                name: string;
                typeId: string;
            } | {
                name: string;
                typeId: number;
            })[];
            typeParameters: number[];
        } | {
            type: string;
            metadataTypeId: number;
            components: ({
                name: string;
                typeId: number;
                typeArguments?: undefined;
            } | {
                name: string;
                typeId: number;
                typeArguments: {
                    name: string;
                    typeId: number;
                }[];
            })[];
            typeParameters?: undefined;
        } | {
            type: string;
            metadataTypeId: number;
            components: ({
                name: string;
                typeId: number;
            } | {
                name: string;
                typeId: string;
            })[];
            typeParameters?: undefined;
        } | {
            type: string;
            metadataTypeId: number;
            components: ({
                name: string;
                typeId: number;
                typeArguments: {
                    name: string;
                    typeId: number;
                }[];
            } | {
                name: string;
                typeId: string;
                typeArguments?: undefined;
            })[];
            typeParameters: number[];
        })[];
        functions: {
            name: string;
            inputs: {
                name: string;
                concreteTypeId: string;
            }[];
            output: string;
            attributes: {
                name: string;
                arguments: string[];
            }[];
        }[];
        loggedTypes: {
            logId: string;
            concreteTypeId: string;
        }[];
        messagesTypes: never[];
        configurables: never[];
        errorCodes: {};
    };
    static readonly storageSlots: StorageSlot[];
    interface: TradeAccountInterface;
    functions: {
        call_contract: InvokeFunction<[signature: Option<SignatureInput>, call: CallContractArgInput], void>;
        call_contracts: InvokeFunction<[signature: Option<SignatureInput>, calls: Vec<CallContractArgInput>], void>;
        get_current_session: InvokeFunction<[], Option<SessionOutput>>;
        get_nonce: InvokeFunction<[], BN>;
        session_call_contract: InvokeFunction<[signature: SignatureInput, call: CallContractArgInput], void>;
        session_call_contracts: InvokeFunction<[signature: SignatureInput, calls: Vec<CallContractArgInput>], void>;
        set_session: InvokeFunction<[signature?: Option<SignatureInput>, session?: Option<SessionInput>], void>;
        validate_session: InvokeFunction<[session_id: IdentityInput], boolean>;
        withdraw: InvokeFunction<[
            signature: Option<SignatureInput>,
            to: IdentityInput,
            amount: BigNumberish,
            asset_id: AssetIdInput
        ], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=TradeAccount.d.ts.map