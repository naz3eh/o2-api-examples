import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction } from 'fuels';
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
export declare enum SetProxyOwnerErrorInput {
    CannotUninitialize = "CannotUninitialize"
}
export declare enum SetProxyOwnerErrorOutput {
    CannotUninitialize = "CannotUninitialize"
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
export type OwnershipTransferredEventInput = {
    previous_owner: Option<IdentityInput>;
    new_owner: IdentityInput;
    timestamp: TimeInput;
};
export type OwnershipTransferredEventOutput = {
    previous_owner: Option<IdentityOutput>;
    new_owner: IdentityOutput;
    timestamp: TimeOutput;
};
export type ProxyOwnerSetInput = {
    new_proxy_owner: StateInput;
};
export type ProxyOwnerSetOutput = {
    new_proxy_owner: StateOutput;
};
export type ProxyTargetSetInput = {
    new_target: ContractIdInput;
};
export type ProxyTargetSetOutput = {
    new_target: ContractIdOutput;
};
export type TimeInput = {
    unix: BigNumberish;
};
export type TimeOutput = {
    unix: BN;
};
export type TradeAccountRegistryProxyConfigurables = Partial<{
    INITIAL_OWNER: StateInput;
    INITIAL_TARGET: ContractIdInput;
}>;
export declare class TradeAccountRegistryProxyInterface extends Interface {
    constructor();
    functions: {
        proxy_target: FunctionFragment;
        set_proxy_target: FunctionFragment;
        proxy_owner: FunctionFragment;
        initialize_proxy: FunctionFragment;
        set_owner: FunctionFragment;
    };
}
export declare class TradeAccountRegistryProxy extends __Contract {
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
                typeId: number;
                typeArguments?: undefined;
            })[];
            typeParameters?: undefined;
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
    interface: TradeAccountRegistryProxyInterface;
    functions: {
        proxy_target: InvokeFunction<[], Option<ContractIdOutput>>;
        set_proxy_target: InvokeFunction<[new_target: ContractIdInput], void>;
        proxy_owner: InvokeFunction<[], StateOutput>;
        initialize_proxy: InvokeFunction<[], void>;
        set_owner: InvokeFunction<[new_owner: IdentityInput], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=TradeAccountRegistryProxy.d.ts.map