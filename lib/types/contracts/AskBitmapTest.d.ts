import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction } from 'fuels';
import type { Option } from './common';
export declare class AskBitmapTestInterface extends Interface {
    constructor();
    functions: {
        has: FunctionFragment;
        min: FunctionFragment;
        set: FunctionFragment;
        unset: FunctionFragment;
    };
}
export declare class AskBitmapTest extends __Contract {
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
    interface: AskBitmapTestInterface;
    functions: {
        has: InvokeFunction<[price: BigNumberish], boolean>;
        min: InvokeFunction<[], Option<BN>>;
        set: InvokeFunction<[price: BigNumberish], void>;
        unset: InvokeFunction<[price: BigNumberish], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=AskBitmapTest.d.ts.map