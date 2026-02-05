"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestAPI = void 0;
const account_api_1 = require("./endpoints/account-api");
const session_api_1 = require("./endpoints/session-api");
const market_api_1 = require("./endpoints/market-api");
const bars_api_1 = require("./endpoints/bars-api");
const health_api_1 = require("./endpoints/health-api");
const balance_api_1 = require("./endpoints/balance-api");
const trades_api_1 = require("./endpoints/trades-api");
const depth_api_1 = require("./endpoints/depth-api");
const orders_api_1 = require("./endpoints/orders-api");
const order_api_1 = require("./endpoints/order-api");
const trade_account_1 = require("./trade-account");
const httpRequest_1 = require("./utils/httpRequest");
const o2_encoders_1 = require("./utils/o2-encoders");
const OrderBook_1 = require("../types/contracts/OrderBook");
class RestAPI {
    configuration;
    // Handle signing and nonces
    tradeAccountManager;
    // Api Calls
    accountApi;
    sessionApi;
    marketApi;
    barsApi;
    healthApi;
    balanceApi;
    tradesApi;
    depthApi;
    ordersApi;
    orderApi;
    constructor(configuration) {
        this.configuration = configuration;
        // API
        this.accountApi = new account_api_1.AccountApi(configuration);
        this.sessionApi = new session_api_1.SessionApi(configuration);
        this.marketApi = new market_api_1.MarketApi(configuration);
        this.barsApi = new bars_api_1.BarsApi(configuration);
        this.healthApi = new health_api_1.HealthApi(configuration);
        this.balanceApi = new balance_api_1.BalanceApi(configuration);
        this.tradesApi = new trades_api_1.TradesApi(configuration);
        this.depthApi = new depth_api_1.DepthApi(configuration);
        this.ordersApi = new orders_api_1.OrdersApi(configuration);
        this.orderApi = new order_api_1.OrderApi(configuration);
    }
    /**
     * Initializes trade account manager by setting up trade account contract, fetching nonce, and creating a 30-day session.
     * @param tradeAccountManager - Trade account manager configuration.
     */
    async initTradeAccountManager(tradeAccountManager) {
        // Create TradeAccountId if not passed
        if (!tradeAccountManager.tradeAccountId) {
            const responseTradeAccount = await this.createTradingAccount({
                address: tradeAccountManager.account.address.toString(),
            });
            tradeAccountManager.tradeAccountId = (await responseTradeAccount.data()).trade_account_id;
            if (!tradeAccountManager.contractIds) {
                tradeAccountManager.contractIds = [];
            }
            tradeAccountManager.contractIds.push(tradeAccountManager.tradeAccountId);
        }
        this.tradeAccountManager = new trade_account_1.TradeAccountManager(tradeAccountManager);
        await this.tradeAccountManager.fetchNonce();
        await this.tradeAccountManager.recoverSession();
        const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
        if (!tradeAccountManager.contractIds) {
            throw new Error('contractIds must be defined');
        }
        await this.createSession({ contractIds: tradeAccountManager.contractIds, expiry });
    }
    /**
     * Generic function to send a request.
     * @param endpoint - The API endpoint to call.
     * @param method - HTTP method to use (GET, POST, DELETE, etc.).
     * @param params - Query parameters for the request.
     * @returns A promise resolving to the response data object.
     */
    sendRequest(endpoint, method, params = {}) {
        return (0, httpRequest_1.sendRequest)(this.configuration, endpoint, method, params);
    }
    getTradeAccountId() {
        return this.tradeAccountManager.contractId;
    }
    /**
     * Initializes a trade account contract, all balance for trading need to be in this account.
     * @param requestParameters - The user wallet address.
     */
    async createTradingAccount(requestParameters) {
        return await this.accountApi.createTradingAccount(requestParameters);
    }
    /**
     * Initializes a new session if not already initialized. Retreive the session otherwise
     * @param requestParameters - The orderbooks the trading account is allowed to trade in.
     */
    async createSession(requestParameters) {
        const params = await this.tradeAccountManager.api_CreateSessionParams(requestParameters.contractIds, requestParameters.expiry);
        let session = await this.accountApi.createSession(params, this.tradeAccountManager.ownerAddress.toString());
        this.tradeAccountManager.setSession(await session.data());
        this.tradeAccountManager.incrementNonce();
        return session;
    }
    /**
     * Submit an array of actions as a transaction. If any actions fail, the transaction fails completely.
     * Maximum of 5 actions per transaction. A settle balance is automatically included if there is
     * a create order.
     * @param requestParameters - The actions on the orderbook.
     */
    async sessionSubmitTransaction(requestParameters) {
        // Convert actions to contract calls
        const encodedActions = await (0, o2_encoders_1.encodeActions)(this.tradeAccountManager.identity, new OrderBook_1.OrderBook(requestParameters.market.contract_id, this.tradeAccountManager.account), {
            baseAssetId: requestParameters.market.base.asset,
            quoteAssetId: requestParameters.market.quote.asset,
            baseDecimals: requestParameters.market.base.decimals,
            quoteDecimals: requestParameters.market.quote.decimals,
        }, requestParameters.actions, this.tradeAccountManager.defaultGasLimit);
        // Convert to API readable
        const payload = await this.tradeAccountManager.api_SessionCallContractsParams(encodedActions.invokeScopes);
        const response = await this.sessionApi.sessionSubmitTransaction({
            actions: [
                {
                    market_id: requestParameters.market.market_id,
                    actions: encodedActions.actions,
                },
            ],
            signature: payload.signature,
            nonce: payload.nonce,
            trade_account_id: payload.trade_account_id,
            session_id: payload.session_id,
            variable_outputs: payload.variable_outputs,
            min_gas_limit: payload.min_gas_limit,
            collect_orders: true,
        }, this.tradeAccountManager.ownerAddress.toString());
        this.tradeAccountManager.incrementNonce();
        return response;
    }
    /**
     * Retreives all markets.
     */
    async getMarkets() {
        return await this.marketApi.getMarkets();
    }
    /**
     * Retrieves ticker information for a specific market.
     * @param requestParameters - The market ID to get ticker for.
     */
    async getTicker(requestParameters) {
        return await this.marketApi.getTicker(requestParameters);
    }
    /**
     * Retrieves summary information for a specific market.
     * @param requestParameters - The market ID to get summary for.
     */
    async getSummary(requestParameters) {
        return await this.marketApi.getSummary(requestParameters);
    }
    /**
     * Retreives the market candles. Can specify either retreive the latest x candles or a time range.
     * @param requestParameters - The range of the candles.
     */
    async getBars(requestParameters) {
        return await this.barsApi.getBars(requestParameters);
    }
    /**
     * Health check.
     */
    async getHealth() {
        return await this.healthApi.getHealth();
    }
    /**
     * Retrieves balance information for a specific asset and contract.
     * @param requestParameters - The asset ID and contract address.
     */
    async getBalance(requestParameters) {
        if (requestParameters.contract === undefined) {
            requestParameters.contract = this.tradeAccountManager.contractId.toString();
        }
        return await this.balanceApi.getBalance(requestParameters);
    }
    /**
     * Retrieves recent trades for a specific market.
     * @param requestParameters - The market ID, direction, and count of trades to retrieve.
     */
    async getTrades(requestParameters) {
        return await this.tradesApi.getTrades(requestParameters);
    }
    /**
     * Retrieves trades by account for a specific market and contract.
     * @param requestParameters - The market ID, contract address, direction, and count of trades to retrieve.
     */
    async getTradesByAccount(requestParameters) {
        if (requestParameters.contract === undefined) {
            requestParameters.contract = this.tradeAccountManager.contractId.toString();
        }
        return await this.tradesApi.getTradesByAccount(requestParameters);
    }
    /**
     * Retrieves order book depth for a specific market.
     * @param requestParameters - The market ID and precision for depth aggregation.
     */
    async getDepth(requestParameters) {
        return await this.depthApi.getDepth(requestParameters);
    }
    /**
     * Retrieves orders for a specific market and contract.
     * @param requestParameters - The market ID, filters for orders and optional contract address.
     */
    async getOrders(requestParameters) {
        if (requestParameters.contract === undefined) {
            requestParameters.contract = this.tradeAccountManager.contractId.toString();
        }
        return await this.ordersApi.getOrders(requestParameters);
    }
    /**
     * Retrieves a single order by ID and market.
     * @param requestParameters - The order ID and market ID.
     */
    async getOrder(requestParameters) {
        return await this.orderApi.getOrder(requestParameters);
    }
}
exports.RestAPI = RestAPI;
//# sourceMappingURL=client.js.map