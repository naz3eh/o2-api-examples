import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction, StrSlice } from 'fuels';
import type { Option, Enum, Vec, Result } from './common';
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
export declare enum TradeAccountRegistryErrorInput {
    OwnerAlreadyHasTradeAccount = "OwnerAlreadyHasTradeAccount",
    TradeAccountNotRegistered = "TradeAccountNotRegistered",
    TradeAccountAlreadyHasReferer = "TradeAccountAlreadyHasReferer"
}
export declare enum TradeAccountRegistryErrorOutput {
    OwnerAlreadyHasTradeAccount = "OwnerAlreadyHasTradeAccount",
    TradeAccountNotRegistered = "TradeAccountNotRegistered",
    TradeAccountAlreadyHasReferer = "TradeAccountAlreadyHasReferer"
}
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
export type PageInput<T> = {
    items: Vec<T>;
    page: BigNumberish;
    total: BigNumberish;
};
export type PageOutput<T> = {
    items: Vec<T>;
    page: BN;
    total: BN;
};
export type PauseEventInput = {
    caller: IdentityInput;
};
export type PauseEventOutput = {
    caller: IdentityOutput;
};
export type TradeAccountRefererInput = {
    trade_account: ContractIdInput;
    referer: IdentityInput;
};
export type TradeAccountRefererOutput = {
    trade_account: ContractIdOutput;
    referer: IdentityOutput;
};
export type TradeAccountRegisteredInput = {
    contract_id: ContractIdInput;
    owner: IdentityInput;
};
export type TradeAccountRegisteredOutput = {
    contract_id: ContractIdOutput;
    owner: IdentityOutput;
};
export type UnpauseEventInput = {
    caller: IdentityInput;
};
export type UnpauseEventOutput = {
    caller: IdentityOutput;
};
export type TradeAccountRegistryConfigurables = Partial<{
    INITIAL_OWNER: StateInput;
    ORACLE_CONTRACT_ID: ContractIdInput;
    TRADE_ACCOUNT_PROXY_ROOT: string;
    DEFAULT_TRADE_ACCOUNT_PROXY: ContractIdInput;
}>;
export declare class TradeAccountRegistryInterface extends Interface {
    constructor();
    functions: {
        factory_bytecode_root: FunctionFragment;
        is_valid: FunctionFragment;
        register_contract: FunctionFragment;
        default_bytecode: FunctionFragment;
        get_oracle_id: FunctionFragment;
        get_trade_account: FunctionFragment;
        get_trade_account_referer: FunctionFragment;
        get_trade_accounts: FunctionFragment;
        register_referer: FunctionFragment;
        initialize: FunctionFragment;
        transfer_ownership: FunctionFragment;
        owner: FunctionFragment;
        is_paused: FunctionFragment;
        pause: FunctionFragment;
        unpause: FunctionFragment;
    };
}
export declare class TradeAccountRegistry extends __Contract {
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
            components: ({
                name: string;
                typeId: string;
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
        } | {
            type: string;
            metadataTypeId: number;
            components?: undefined;
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
        functions: ({
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
        } | {
            name: string;
            inputs: never[];
            output: string;
            attributes: null;
        })[];
        loggedTypes: {
            logId: string;
            concreteTypeId: string;
        }[];
        messagesTypes: never[];
        configurables: {
            name: string;
            concreteTypeId: string;
            offset: number;
            indirect: boolean;
        }[];
        errorCodes: {};
    };
    static readonly storageSlots: StorageSlot[];
    interface: TradeAccountRegistryInterface;
    functions: {
        factory_bytecode_root: InvokeFunction<[], Option<string>>;
        is_valid: InvokeFunction<[child_contract: ContractIdInput], boolean>;
        register_contract: InvokeFunction<[
            child_contract: ContractIdInput,
            configurables?: Option<Vec<[BigNumberish, Vec<BigNumberish>]>>
        ], Result<string, StrSlice>>;
        default_bytecode: InvokeFunction<[], Option<ContractIdOutput>>;
        get_oracle_id: InvokeFunction<[], ContractIdOutput>;
        get_trade_account: InvokeFunction<[owner: IdentityInput], Option<ContractIdOutput>>;
        get_trade_account_referer: InvokeFunction<[contract_id: ContractIdInput], Option<IdentityOutput>>;
        get_trade_accounts: InvokeFunction<[page: BigNumberish], PageOutput<TradeAccountRegisteredOutput>>;
        register_referer: InvokeFunction<[referer: IdentityInput], void>;
        initialize: InvokeFunction<[], void>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
        owner: InvokeFunction<[], StateOutput>;
        is_paused: InvokeFunction<[], boolean>;
        pause: InvokeFunction<[], void>;
        unpause: InvokeFunction<[], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=TradeAccountRegistry.d.ts.map