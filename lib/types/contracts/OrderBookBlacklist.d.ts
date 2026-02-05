import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, FunctionFragment, InvokeFunction } from 'fuels';
import type { Enum } from './common';
export declare enum AccessErrorInput {
    NotOwner = "NotOwner"
}
export declare enum AccessErrorOutput {
    NotOwner = "NotOwner"
}
export declare enum BlacklistErrorInput {
    TraderAlreadyBlacklisted = "TraderAlreadyBlacklisted",
    TraderNotBlacklisted = "TraderNotBlacklisted"
}
export declare enum BlacklistErrorOutput {
    TraderAlreadyBlacklisted = "TraderAlreadyBlacklisted",
    TraderNotBlacklisted = "TraderNotBlacklisted"
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
export type AddBlacklistEventInput = {
    trader: IdentityInput;
};
export type AddBlacklistEventOutput = {
    trader: IdentityOutput;
};
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
export type RemoveBlacklistEventInput = {
    trader: IdentityInput;
};
export type RemoveBlacklistEventOutput = {
    trader: IdentityOutput;
};
export type OrderBookBlacklistConfigurables = Partial<{
    INITIAL_OWNER: StateInput;
}>;
export declare class OrderBookBlacklistInterface extends Interface {
    constructor();
    functions: {
        blacklist: FunctionFragment;
        initialize: FunctionFragment;
        remove_blacklist: FunctionFragment;
        transfer_ownership: FunctionFragment;
        owner: FunctionFragment;
    };
}
export declare class OrderBookBlacklist extends __Contract {
    static readonly abi: {
        programType: string;
        specVersion: string;
        encodingVersion: string;
        concreteTypes: ({
            type: string;
            concreteTypeId: string;
            metadataTypeId?: undefined;
        } | {
            type: string;
            concreteTypeId: string;
            metadataTypeId: number;
        })[];
        metadataTypes: ({
            type: string;
            metadataTypeId: number;
            components?: undefined;
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
    interface: OrderBookBlacklistInterface;
    functions: {
        blacklist: InvokeFunction<[trader: IdentityInput], void>;
        initialize: InvokeFunction<[], void>;
        remove_blacklist: InvokeFunction<[trader: IdentityInput], void>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
        owner: InvokeFunction<[], StateOutput>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=OrderBookBlacklist.d.ts.map