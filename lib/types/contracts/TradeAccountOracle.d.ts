import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, FunctionFragment, InvokeFunction } from 'fuels';
import type { Option, Enum } from './common';
export declare enum AccessErrorInput {
    NotOwner = "NotOwner"
}
export declare enum AccessErrorOutput {
    NotOwner = "NotOwner"
}
export type IdentityInput = Enum<{
    Address: AddressInput;
    ContractId: ContractIdInput;
}>;
export type IdentityOutput = Enum<{
    Address: AddressOutput;
    ContractId: ContractIdOutput;
}>;
export declare enum InitializationErrorInput {
    CannotReinitialized = "CannotReinitialized"
}
export declare enum InitializationErrorOutput {
    CannotReinitialized = "CannotReinitialized"
}
export declare enum PauseErrorInput {
    Paused = "Paused",
    NotPaused = "NotPaused"
}
export declare enum PauseErrorOutput {
    Paused = "Paused",
    NotPaused = "NotPaused"
}
export type StateInput = Enum<{
    Uninitialized: undefined;
    Initialized: IdentityInput;
    Revoked: undefined;
}>;
export type StateOutput = Enum<{
    Uninitialized: void;
    Initialized: IdentityOutput;
    Revoked: void;
}>;
export type AddressInput = {
    bits: string;
};
export type AddressOutput = AddressInput;
export type ContractIdInput = {
    bits: string;
};
export type ContractIdOutput = ContractIdInput;
export type OwnershipSetInput = {
    new_owner: IdentityInput;
};
export type OwnershipSetOutput = {
    new_owner: IdentityOutput;
};
export type OwnershipTransferredInput = {
    new_owner: IdentityInput;
    previous_owner: IdentityInput;
};
export type OwnershipTransferredOutput = {
    new_owner: IdentityOutput;
    previous_owner: IdentityOutput;
};
export declare class TradeAccountOracleInterface extends Interface {
    constructor();
    functions: {
        get_trade_account_impl: FunctionFragment;
        initialize: FunctionFragment;
        set_trade_account_impl: FunctionFragment;
        transfer_ownership: FunctionFragment;
        owner: FunctionFragment;
        is_paused: FunctionFragment;
        pause: FunctionFragment;
        unpause: FunctionFragment;
    };
}
export declare class TradeAccountOracle extends __Contract {
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
    interface: TradeAccountOracleInterface;
    functions: {
        get_trade_account_impl: InvokeFunction<[], Option<ContractIdOutput>>;
        initialize: InvokeFunction<[owner: IdentityInput, trade_account_impl: ContractIdInput], void>;
        set_trade_account_impl: InvokeFunction<[contract_id: ContractIdInput], boolean>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
        owner: InvokeFunction<[], StateOutput>;
        is_paused: InvokeFunction<[], boolean>;
        pause: InvokeFunction<[], void>;
        unpause: InvokeFunction<[], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=TradeAccountOracle.d.ts.map