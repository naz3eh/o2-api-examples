import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction } from 'fuels';
import type { Option } from './common';
export declare class MinHeapTestInterface extends Interface {
    constructor();
    functions: {
        is_empty: FunctionFragment;
        len: FunctionFragment;
        peek: FunctionFragment;
        pop: FunctionFragment;
        push: FunctionFragment;
        remove: FunctionFragment;
    };
}
export declare class MinHeapTest extends __Contract {
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
            typeArguments: string[];
        })[];
        metadataTypes: ({
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
        loggedTypes: never[];
        messagesTypes: never[];
        configurables: never[];
        errorCodes: {};
    };
    static readonly storageSlots: StorageSlot[];
    interface: MinHeapTestInterface;
    functions: {
        is_empty: InvokeFunction<[], boolean>;
        len: InvokeFunction<[], BN>;
        peek: InvokeFunction<[], Option<BN>>;
        pop: InvokeFunction<[], Option<BN>>;
        push: InvokeFunction<[value: BigNumberish], void>;
        remove: InvokeFunction<[val: BigNumberish], boolean>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=MinHeapTest.d.ts.map