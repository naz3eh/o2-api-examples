import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction, StdString } from 'fuels';
import type { Option, Enum, Vec } from './common';
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
export type AssetInfoInput = {
    name: StdString;
    symbol: StdString;
    decimals: BigNumberish;
    mint_amount: BigNumberish;
};
export type AssetInfoOutput = {
    name: StdString;
    symbol: StdString;
    decimals: number;
    mint_amount: BN;
};
export type ContractIdInput = {
    bits: string;
};
export type ContractIdOutput = ContractIdInput;
export type CooldownInfoInput = {
    current_block: BigNumberish;
    enable_on_block: BigNumberish;
};
export type CooldownInfoOutput = {
    current_block: BN;
    enable_on_block: BN;
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
export type SetDecimalsEventInput = {
    asset: AssetIdInput;
    decimals: BigNumberish;
    sender: IdentityInput;
};
export type SetDecimalsEventOutput = {
    asset: AssetIdOutput;
    decimals: number;
    sender: IdentityOutput;
};
export type SetNameEventInput = {
    asset: AssetIdInput;
    name: Option<StdString>;
    sender: IdentityInput;
};
export type SetNameEventOutput = {
    asset: AssetIdOutput;
    name: Option<StdString>;
    sender: IdentityOutput;
};
export type SetSymbolEventInput = {
    asset: AssetIdInput;
    symbol: Option<StdString>;
    sender: IdentityInput;
};
export type SetSymbolEventOutput = {
    asset: AssetIdOutput;
    symbol: Option<StdString>;
    sender: IdentityOutput;
};
export type TotalSupplyEventInput = {
    asset: AssetIdInput;
    supply: BigNumberish;
    sender: IdentityInput;
};
export type TotalSupplyEventOutput = {
    asset: AssetIdOutput;
    supply: BN;
    sender: IdentityOutput;
};
export declare class Src20TokenInterface extends Interface {
    constructor();
    functions: {
        decimals: FunctionFragment;
        name: FunctionFragment;
        symbol: FunctionFragment;
        total_assets: FunctionFragment;
        total_supply: FunctionFragment;
        owner: FunctionFragment;
        admin_mint_asset: FunctionFragment;
        initialize: FunctionFragment;
        initialize_assets: FunctionFragment;
        mint_asset: FunctionFragment;
        mint_cooldown: FunctionFragment;
        set_cooldown_period: FunctionFragment;
        set_mint_amount: FunctionFragment;
        transfer_ownership: FunctionFragment;
    };
}
export declare class Src20Token extends __Contract {
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
    interface: Src20TokenInterface;
    functions: {
        decimals: InvokeFunction<[asset: AssetIdInput], Option<number>>;
        name: InvokeFunction<[asset: AssetIdInput], Option<StdString>>;
        symbol: InvokeFunction<[asset: AssetIdInput], Option<StdString>>;
        total_assets: InvokeFunction<[], BN>;
        total_supply: InvokeFunction<[asset: AssetIdInput], Option<BN>>;
        owner: InvokeFunction<[], StateOutput>;
        admin_mint_asset: InvokeFunction<[recipient: IdentityInput, symbol: StdString, mint_amount: BigNumberish], void>;
        initialize: InvokeFunction<[owner: IdentityInput], void>;
        initialize_assets: InvokeFunction<[assets: Vec<AssetInfoInput>], Vec<AssetIdOutput>>;
        mint_asset: InvokeFunction<[recipient: IdentityInput, symbol: StdString], void>;
        mint_cooldown: InvokeFunction<[recipient: IdentityInput, symbol: StdString], CooldownInfoOutput>;
        set_cooldown_period: InvokeFunction<[cooldown_period: BigNumberish], void>;
        set_mint_amount: InvokeFunction<[symbol: StdString, mint_amount: BigNumberish], void>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=Src20Token.d.ts.map