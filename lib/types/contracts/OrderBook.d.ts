import { Contract as __Contract, Interface } from 'fuels';
import type { Provider, Account, StorageSlot, Address, BigNumberish, BN, FunctionFragment, InvokeFunction, StdString } from 'fuels';
import type { Option, Enum, Vec } from './common';
export declare enum AccessErrorInput {
    NotOwner = "NotOwner"
}
export declare enum AccessErrorOutput {
    NotOwner = "NotOwner"
}
export declare enum FeeErrorInput {
    NoFeesAvailable = "NoFeesAvailable"
}
export declare enum FeeErrorOutput {
    NoFeesAvailable = "NoFeesAvailable"
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
export declare enum OrderBookInitializationErrorInput {
    InvalidAsset = "InvalidAsset",
    InvalidDecimals = "InvalidDecimals",
    InvalidPriceWindow = "InvalidPriceWindow",
    InvalidPricePrecision = "InvalidPricePrecision",
    OwnerNotSet = "OwnerNotSet",
    InvalidMinOrder = "InvalidMinOrder"
}
export declare enum OrderBookInitializationErrorOutput {
    InvalidAsset = "InvalidAsset",
    InvalidDecimals = "InvalidDecimals",
    InvalidPriceWindow = "InvalidPriceWindow",
    InvalidPricePrecision = "InvalidPricePrecision",
    OwnerNotSet = "OwnerNotSet",
    InvalidMinOrder = "InvalidMinOrder"
}
export declare enum OrderCancelErrorInput {
    NotOrderOwner = "NotOrderOwner",
    TraderNotBlacklisted = "TraderNotBlacklisted",
    NoBlacklist = "NoBlacklist"
}
export declare enum OrderCancelErrorOutput {
    NotOrderOwner = "NotOrderOwner",
    TraderNotBlacklisted = "TraderNotBlacklisted",
    NoBlacklist = "NoBlacklist"
}
export type OrderCreationErrorInput = Enum<{
    InvalidOrderArgs: undefined;
    InvalidInputAmount: undefined;
    InvalidAsset: undefined;
    PriceExceedsRange: undefined;
    PricePrecision: undefined;
    InvalidHeapPrices: [BigNumberish, BigNumberish];
    FractionalPrice: undefined;
    OrderNotFilled: undefined;
    OrderPartiallyFilled: undefined;
    TraderNotWhiteListed: undefined;
    TraderBlackListed: undefined;
    InvalidMarketOrder: undefined;
    InvalidMarketOrderArgs: undefined;
}>;
export type OrderCreationErrorOutput = Enum<{
    InvalidOrderArgs: void;
    InvalidInputAmount: void;
    InvalidAsset: void;
    PriceExceedsRange: void;
    PricePrecision: void;
    InvalidHeapPrices: [BN, BN];
    FractionalPrice: void;
    OrderNotFilled: void;
    OrderPartiallyFilled: void;
    TraderNotWhiteListed: void;
    TraderBlackListed: void;
    InvalidMarketOrder: void;
    InvalidMarketOrderArgs: void;
}>;
export type OrderTypeInput = Enum<{
    Limit: [];
    Spot: undefined;
    FillOrKill: undefined;
    PostOnly: undefined;
    Market: undefined;
    BoundedMarket: [BigNumberish, BigNumberish];
}>;
export type OrderTypeOutput = Enum<{
    Limit: [];
    Spot: void;
    FillOrKill: void;
    PostOnly: void;
    Market: void;
    BoundedMarket: [BN, BN];
}>;
export declare enum PauseErrorInput {
    Paused = "Paused",
    NotPaused = "NotPaused"
}
export declare enum PauseErrorOutput {
    Paused = "Paused",
    NotPaused = "NotPaused"
}
export declare enum SideInput {
    Buy = "Buy",
    Sell = "Sell"
}
export declare enum SideOutput {
    Buy = "Buy",
    Sell = "Sell"
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
export type FeesClaimedEventInput = {
    base_fees: BigNumberish;
    quote_fees: BigNumberish;
};
export type FeesClaimedEventOutput = {
    base_fees: BN;
    quote_fees: BN;
};
export type MatchIdInput = {
    maker_id: string;
    taker_id: string;
};
export type MatchIdOutput = MatchIdInput;
export type OrderInput = {
    order_id: string;
    trader_id: IdentityInput;
    side: SideInput;
    price: BigNumberish;
    quantity: BigNumberish;
    order_type: OrderTypeInput;
};
export type OrderOutput = {
    order_id: string;
    trader_id: IdentityOutput;
    side: SideOutput;
    price: BN;
    quantity: BN;
    order_type: OrderTypeOutput;
};
export type OrderArgsInput = {
    price: BigNumberish;
    quantity: BigNumberish;
    order_type: OrderTypeInput;
};
export type OrderArgsOutput = {
    price: BN;
    quantity: BN;
    order_type: OrderTypeOutput;
};
export type OrderBookBlacklistEventInput = {
    blacklist: Option<ContractIdInput>;
};
export type OrderBookBlacklistEventOutput = {
    blacklist: Option<ContractIdOutput>;
};
export type OrderBookConfigEventInput = {
    base_asset: AssetIdInput;
    quote_asset: AssetIdInput;
    base_decimals: BigNumberish;
    quote_decimals: BigNumberish;
    min_order: BigNumberish;
    maker_fee: BigNumberish;
    taker_fee: BigNumberish;
    price_precision: BigNumberish;
    quantity_precision: BigNumberish;
    price_window: BigNumberish;
    dust: BigNumberish;
    allow_fractional_price: boolean;
};
export type OrderBookConfigEventOutput = {
    base_asset: AssetIdOutput;
    quote_asset: AssetIdOutput;
    base_decimals: BN;
    quote_decimals: BN;
    min_order: BN;
    maker_fee: BN;
    taker_fee: BN;
    price_precision: BN;
    quantity_precision: BN;
    price_window: BN;
    dust: BN;
    allow_fractional_price: boolean;
};
export type OrderBookSymbolsEventInput = {
    base_symbol: StdString;
    quote_symbol: StdString;
};
export type OrderBookSymbolsEventOutput = OrderBookSymbolsEventInput;
export type OrderBookWhitelistEventInput = {
    whitelist: Option<ContractIdInput>;
};
export type OrderBookWhitelistEventOutput = {
    whitelist: Option<ContractIdOutput>;
};
export type OrderCancelledEventInput = {
    order_id: string;
    timestamp: TimeInput;
};
export type OrderCancelledEventOutput = {
    order_id: string;
    timestamp: TimeOutput;
};
export type OrderCancelledInternalEventInput = {
    order_id: string;
    timestamp: TimeInput;
};
export type OrderCancelledInternalEventOutput = {
    order_id: string;
    timestamp: TimeOutput;
};
export type OrderCreatedEventInput = {
    order_id: string;
    trader_id: IdentityInput;
    order_side: SideInput;
    order_type: OrderTypeInput;
    quantity: BigNumberish;
    price: BigNumberish;
    timestamp: TimeInput;
};
export type OrderCreatedEventOutput = {
    order_id: string;
    trader_id: IdentityOutput;
    order_side: SideOutput;
    order_type: OrderTypeOutput;
    quantity: BN;
    price: BN;
    timestamp: TimeOutput;
};
export type OrderMatchedEventInput = {
    match_id: MatchIdInput;
    quantity: BigNumberish;
    price: BigNumberish;
    timestamp: TimeInput;
};
export type OrderMatchedEventOutput = {
    match_id: MatchIdOutput;
    quantity: BN;
    price: BN;
    timestamp: TimeOutput;
};
export type OrderOutOfGasEventInput = {
    order_id: string;
    timestamp: TimeInput;
};
export type OrderOutOfGasEventOutput = {
    order_id: string;
    timestamp: TimeOutput;
};
export type OrderTooSmallEventInput = {
    order_id: string;
    timestamp: TimeInput;
};
export type OrderTooSmallEventOutput = {
    order_id: string;
    timestamp: TimeOutput;
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
export type PauseEventInput = {
    caller: IdentityInput;
};
export type PauseEventOutput = {
    caller: IdentityOutput;
};
export type TimeInput = {
    unix: BigNumberish;
};
export type TimeOutput = {
    unix: BN;
};
export type UnpauseEventInput = {
    caller: IdentityInput;
};
export type UnpauseEventOutput = {
    caller: IdentityOutput;
};
export type WithdrawSettledTradeEventInput = {
    trader_id: IdentityInput;
    base_amount: BigNumberish;
    quote_amount: BigNumberish;
};
export type WithdrawSettledTradeEventOutput = {
    trader_id: IdentityOutput;
    base_amount: BN;
    quote_amount: BN;
};
export type OrderBookConfigurables = Partial<{
    INITIAL_OWNER: StateInput;
    BASE_ASSET: AssetIdInput;
    QUOTE_ASSET: AssetIdInput;
    MIN_ORDER: BigNumberish;
    MAKER_FEE: BigNumberish;
    TAKER_FEE: BigNumberish;
    BASE_DECIMALS: BigNumberish;
    QUOTE_DECIMALS: BigNumberish;
    PRICE_WINDOW: BigNumberish;
    PRICE_PRECISION: BigNumberish;
    QUANTITY_PRECISION: BigNumberish;
    DUST: BigNumberish;
    BASE_GAS: BigNumberish;
    MATCH_EVENT_GAS: BigNumberish;
    MATCH_SINGLE_LEVEL_GAS: BigNumberish;
    MATCH_MULTI_LEVEL_GAS: BigNumberish;
    MIN_GAS: BigNumberish;
    ALLOW_FRACTIONAL_PRICE: boolean;
    BASE_SYMBOL: string;
    QUOTE_SYMBOL: string;
    WHITE_LIST_CONTRACT: Option<ContractIdInput>;
    BLACK_LIST_CONTRACT: Option<ContractIdInput>;
}>;
export declare class OrderBookInterface extends Interface {
    constructor();
    functions: {
        cancel_order: FunctionFragment;
        create_order: FunctionFragment;
        get_base_asset: FunctionFragment;
        get_best_buy: FunctionFragment;
        get_best_sell: FunctionFragment;
        get_blacklist_id: FunctionFragment;
        get_heap_price: FunctionFragment;
        get_last_traded_price: FunctionFragment;
        get_maker_fee: FunctionFragment;
        get_minimum_trade_amount: FunctionFragment;
        get_order: FunctionFragment;
        get_orders_at_price: FunctionFragment;
        get_price_precision: FunctionFragment;
        get_quantity_precision: FunctionFragment;
        get_quote_asset: FunctionFragment;
        get_settled_balance_of: FunctionFragment;
        get_taker_fee: FunctionFragment;
        get_whitelist_id: FunctionFragment;
        settle_balance: FunctionFragment;
        settle_balances: FunctionFragment;
        cancel_blacklist_orders: FunctionFragment;
        collect_fees: FunctionFragment;
        current_fees: FunctionFragment;
        emit_orderbook_config: FunctionFragment;
        force_cancel_orders: FunctionFragment;
        initialize: FunctionFragment;
        transfer_ownership: FunctionFragment;
        owner: FunctionFragment;
        is_paused: FunctionFragment;
        pause: FunctionFragment;
        unpause: FunctionFragment;
    };
}
export declare class OrderBook extends __Contract {
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
            components: {
                name: string;
                typeId: number;
                typeArguments: {
                    name: string;
                    typeId: number;
                }[];
            }[];
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
    interface: OrderBookInterface;
    functions: {
        cancel_order: InvokeFunction<[order_id: string], boolean>;
        create_order: InvokeFunction<[order_args: OrderArgsInput], string>;
        get_base_asset: InvokeFunction<[], AssetIdOutput>;
        get_best_buy: InvokeFunction<[], Option<BN>>;
        get_best_sell: InvokeFunction<[], Option<BN>>;
        get_blacklist_id: InvokeFunction<[], Option<ContractIdOutput>>;
        get_heap_price: InvokeFunction<[side: SideInput, price: BigNumberish], boolean>;
        get_last_traded_price: InvokeFunction<[], [BN, TimeOutput]>;
        get_maker_fee: InvokeFunction<[], BN>;
        get_minimum_trade_amount: InvokeFunction<[], BN>;
        get_order: InvokeFunction<[order_id: string], Option<OrderOutput>>;
        get_orders_at_price: InvokeFunction<[side: SideInput, price: BigNumberish], Vec<OrderOutput>>;
        get_price_precision: InvokeFunction<[], BN>;
        get_quantity_precision: InvokeFunction<[], BN>;
        get_quote_asset: InvokeFunction<[], AssetIdOutput>;
        get_settled_balance_of: InvokeFunction<[trader: IdentityInput], [BN, BN]>;
        get_taker_fee: InvokeFunction<[], BN>;
        get_whitelist_id: InvokeFunction<[], Option<ContractIdOutput>>;
        settle_balance: InvokeFunction<[trader: IdentityInput], void>;
        settle_balances: InvokeFunction<[traders: Vec<IdentityInput>], void>;
        cancel_blacklist_orders: InvokeFunction<[orders: Vec<string>], void>;
        collect_fees: InvokeFunction<[fee_recipient: IdentityInput], void>;
        current_fees: InvokeFunction<[], [BN, BN]>;
        emit_orderbook_config: InvokeFunction<[], void>;
        force_cancel_orders: InvokeFunction<[orders: Vec<string>], void>;
        initialize: InvokeFunction<[], void>;
        transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
        owner: InvokeFunction<[], StateOutput>;
        is_paused: InvokeFunction<[], boolean>;
        pause: InvokeFunction<[], void>;
        unpause: InvokeFunction<[], void>;
    };
    constructor(id: string | Address, accountOrProvider: Account | Provider);
}
//# sourceMappingURL=OrderBook.d.ts.map