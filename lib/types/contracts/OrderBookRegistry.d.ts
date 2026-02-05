import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction } from 'fuels';
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
export declare enum OrderBookRegistryErrorInput {
    MarketAlreadyHasOrderBook = "MarketAlreadyHasOrderBook",
    InvalidPair = "InvalidPair"
}
export declare enum OrderBookRegistryErrorOutput {
    MarketAlreadyHasOrderBook = "MarketAlreadyHasOrderBook",
    InvalidPair = "InvalidPair"
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
export type AssetIdInput = {
    bits: string;
};
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = {
    bits: string;
};
export type ContractIdOutput = ContractIdInput;
export type MarketIdInput = {
    base_asset: AssetIdInput;
    quote_asset: AssetIdInput;
};
export type MarketIdOutput = {
    base_asset: AssetIdOutput;
    quote_asset: AssetIdOutput;
};
export type OrderBookRegisteredInput = {
    contract_id: ContractIdInput;
    market_id: MarketIdInput;
};
export type OrderBookRegisteredOutput = {
    contract_id: ContractIdOutput;
    market_id: MarketIdOutput;
};
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
export type UnpauseEventInput = {
    caller: IdentityInput;
};
export type UnpauseEventOutput = {
    caller: IdentityOutput;
};
export type OrderBookRegistryConfigurables = Partial<{
    INITIAL_OWNER: StateInput;
}>;
export declare class OrderBookRegistryInterface extends Interface {
    constructor();
    functions: {
        get_order_book: FunctionFragment;
        get_order_books: FunctionFragment;
        register_order_book: FunctionFragment;
        initialize: FunctionFragment;
        transfer_ownership: FunctionFragment;
        owner: FunctionFragment;
        is_paused: FunctionFragment;
        pause: FunctionFragment;
        unpause: FunctionFragment;
    };
}
export declare class OrderBookRegistry extends __Contract {
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
        configurables: {
            name: string;
            concreteTypeId: string;
            offset: number;
            indirect: boolean;
        }[];
        errorCodes: {};
    };
    static readonly storageSlots: StorageSlot[];
    interface: OrderBookRegistryInterface;
    functions: {
        get_order_book: InvokeFunction<[market_id: MarketIdInput], Option<ContractIdOutput>>;
        get_order_books: InvokeFunction<[page: BigNumberish], PageOutput<OrderBookRegisteredOutput>>;
        register_order_book: InvokeFunction<[
            contract_id: ContractIdInput,
            market_id: MarketIdInput
        ], Result<void, OrderBookRegistryErrorOutput>>;
        initialize: InvokeFunction<[], void>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
        owner: InvokeFunction<[], StateOutput>;
        is_paused: InvokeFunction<[], boolean>;
        pause: InvokeFunction<[], void>;
        unpause: InvokeFunction<[], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=OrderBookRegistry.d.ts.map