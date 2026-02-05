import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction, StrSlice } from 'fuels';
import type { Enum } from './common';
export type LocationInput = Enum<{
    Earth: BigNumberish;
    Mars: undefined;
}>;
export type LocationOutput = Enum<{
    Earth: BN;
    Mars: void;
}>;
export type PersonInput = {
    name: StrSlice;
    age: BigNumberish;
    alive: boolean;
    location: LocationInput;
    some_tuple: [boolean, BigNumberish];
    some_array: [BigNumberish, BigNumberish];
    some_b256: string;
};
export type PersonOutput = {
    name: StrSlice;
    age: BN;
    alive: boolean;
    location: LocationOutput;
    some_tuple: [boolean, BN];
    some_array: [BN, BN];
    some_b256: string;
};
export type SimpleStructInput = {
    a: boolean;
    b: BigNumberish;
};
export type SimpleStructOutput = {
    a: boolean;
    b: BN;
};
export type LargeContractConfigurables = Partial<{
    BOOL: boolean;
    U8: BigNumberish;
    U16: BigNumberish;
    U32: BigNumberish;
    U64: BigNumberish;
    U256: BigNumberish;
    B256: string;
    CONFIGURABLE_STRUCT: SimpleStructInput;
    CONFIGURABLE_ENUM: LocationInput;
    ARRAY_BOOL: [boolean, boolean, boolean];
    ARRAY_U64: [BigNumberish, BigNumberish, BigNumberish];
    TUPLE_BOOL_U64: [boolean, BigNumberish];
    STR_4: string;
}>;
export declare class LargeContractInterface extends Interface {
    constructor();
    functions: {
        assert_configurables: FunctionFragment;
        enum_input_output: FunctionFragment;
        get_storage: FunctionFragment;
        large_blob: FunctionFragment;
        push_storage: FunctionFragment;
        struct_input_output: FunctionFragment;
    };
}
export declare class LargeContract extends __Contract {
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
                typeId: number;
            } | {
                name: string;
                typeId: string;
            })[];
        })[];
        functions: ({
            name: string;
            inputs: {
                name: string;
                concreteTypeId: string;
            }[];
            output: string;
            attributes: null;
        } | {
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
        })[];
        loggedTypes: never[];
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
    interface: LargeContractInterface;
    functions: {
        assert_configurables: InvokeFunction<[], boolean>;
        enum_input_output: InvokeFunction<[loc: LocationInput], LocationOutput>;
        get_storage: InvokeFunction<[index: BigNumberish], number>;
        large_blob: InvokeFunction<[], boolean>;
        push_storage: InvokeFunction<[value: BigNumberish], void>;
        struct_input_output: InvokeFunction<[person: PersonInput], PersonOutput>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=LargeContract.d.ts.map