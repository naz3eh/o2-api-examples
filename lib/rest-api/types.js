"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarResolution = exports.OrderSide = exports.OrderType = exports.Action = exports.ConfigurationRestAPI = void 0;
class ConfigurationRestAPI {
    /**
     * override base path
     * @type {string}
     * @memberof ConfigurationRestAPI
     */
    basePath;
    /**
     * set a timeout (in milliseconds) for the request
     * @default 1000
     * @type {number}
     * @memberof ConfigurationRestAPI
     */
    timeout;
    /**
     * number of retry attempts for failed requests
     * @default 1
     * @type {number}
     * @memberof ConfigurationRestAPI
     */
    retries;
    /**
     * delay between retry attempts in milliseconds
     * @default 1000
     * @type {number}
     * @memberof ConfigurationRestAPI
     */
    backoff;
    /**
     * base options for axios calls
     * @type {Record<string, unknown>}
     * @memberof ConfigurationRestAPI
     * @internal
     */
    baseOptions;
    constructor(param) {
        this.basePath = param.basePath;
        this.retries = param.retries ?? 1;
        this.timeout = param.timeout ?? 1000;
        this.baseOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
}
exports.ConfigurationRestAPI = ConfigurationRestAPI;
var Action;
(function (Action) {
    Action["CreateOrder"] = "create_order";
    Action["CancelOrder"] = "cancel_order";
    Action["GetBars"] = "get_bars";
    Action["GetTrades"] = "get_trades";
    Action["GetDepth"] = "depth";
    Action["GetTradesByAccount"] = "get_trades_by_account";
})(Action || (exports.Action = Action = {}));
// ------- OrderBook Types -------
var OrderType;
(function (OrderType) {
    OrderType["Spot"] = "Spot";
    OrderType["Market"] = "Market";
    OrderType["Limit"] = "Limit";
    OrderType["FillOrKill"] = "FillOrKill";
    OrderType["PostOnly"] = "PostOnly";
})(OrderType || (exports.OrderType = OrderType = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["Buy"] = "Buy";
    OrderSide["Sell"] = "Sell";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
// ------- Bars API Types -------
var BarResolution;
(function (BarResolution) {
    BarResolution["OneSecond"] = "1s";
    BarResolution["OneMinute"] = "1m";
    BarResolution["TwoMinutes"] = "2m";
    BarResolution["ThreeMinutes"] = "3m";
    BarResolution["FiveMinutes"] = "5m";
    BarResolution["FifteenMinutes"] = "15m";
    BarResolution["ThirtyMinutes"] = "30m";
    BarResolution["OneHour"] = "1h";
    BarResolution["TwoHours"] = "2h";
    BarResolution["FourHours"] = "4h";
    BarResolution["SixHours"] = "6h";
    BarResolution["EightHours"] = "8h";
    BarResolution["TwelveHours"] = "12h";
    BarResolution["OneDay"] = "1d";
    BarResolution["ThreeDays"] = "3d";
    BarResolution["OneWeek"] = "1w";
    BarResolution["OneMonth"] = "1M";
    BarResolution["ThreeMonths"] = "3M";
})(BarResolution || (exports.BarResolution = BarResolution = {}));
//# sourceMappingURL=types.js.map