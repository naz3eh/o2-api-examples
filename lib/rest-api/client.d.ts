import { Address } from 'fuels';
import type { SessionInput } from '../types/contracts/TradeAccount';
import { ConfigurationRestAPI, RestApiResponse, TradeAccountManagerConfig, CreateTradingAccountRequest, CreateTradingAccountResponse, CreateSessionRequest, MarketsResponse, GetTickerRequest, GetTickerResponse, GetSummaryRequest, GetSummaryResponse, GetBarsRequest, GetBarsResponse, GetBalanceRequest, GetBalanceResponse, GetTradesRequest, GetTradesResponse, GetTradesByAccountRequest, GetTradesByAccountResponse, GetDepthRequest, GetDepthResponse, GetOrdersRequest, GetOrdersResponse, GetOrderRequest, GetOrderResponse, SessionSubmitTransactionResponse, SessionActionBatch } from './types';
export declare class RestAPI {
    private configuration;
    private tradeAccountManager;
    private accountApi;
    private sessionApi;
    private marketApi;
    private barsApi;
    private healthApi;
    private balanceApi;
    private tradesApi;
    private depthApi;
    private ordersApi;
    private orderApi;
    constructor(configuration: ConfigurationRestAPI);
    /**
     * Initializes trade account manager by setting up trade account contract, fetching nonce, and creating a 30-day session.
     * @param tradeAccountManager - Trade account manager configuration.
     */
    initTradeAccountManager(tradeAccountManager: TradeAccountManagerConfig): Promise<void>;
    /**
     * Generic function to send a request.
     * @param endpoint - The API endpoint to call.
     * @param method - HTTP method to use (GET, POST, DELETE, etc.).
     * @param params - Query parameters for the request.
     * @returns A promise resolving to the response data object.
     */
    sendRequest<T>(endpoint: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH', params?: Record<string, unknown>): Promise<RestApiResponse<T>>;
    getTradeAccountId(): Address;
    /**
     * Initializes a trade account contract, all balance for trading need to be in this account.
     * @param requestParameters - The user wallet address.
     */
    createTradingAccount(requestParameters: CreateTradingAccountRequest): Promise<RestApiResponse<CreateTradingAccountResponse>>;
    /**
     * Initializes a new session if not already initialized. Retreive the session otherwise
     * @param requestParameters - The orderbooks the trading account is allowed to trade in.
     */
    createSession(requestParameters: CreateSessionRequest): Promise<RestApiResponse<SessionInput>>;
    /**
     * Submit an array of actions as a transaction. If any actions fail, the transaction fails completely.
     * Maximum of 5 actions per transaction. A settle balance is automatically included if there is
     * a create order.
     * @param requestParameters - The actions on the orderbook.
     */
    sessionSubmitTransaction(requestParameters: SessionActionBatch): Promise<RestApiResponse<SessionSubmitTransactionResponse>>;
    /**
     * Retreives all markets.
     */
    getMarkets(): Promise<RestApiResponse<MarketsResponse>>;
    /**
     * Retrieves ticker information for a specific market.
     * @param requestParameters - The market ID to get ticker for.
     */
    getTicker(requestParameters: GetTickerRequest): Promise<RestApiResponse<GetTickerResponse>>;
    /**
     * Retrieves summary information for a specific market.
     * @param requestParameters - The market ID to get summary for.
     */
    getSummary(requestParameters: GetSummaryRequest): Promise<RestApiResponse<GetSummaryResponse>>;
    /**
     * Retreives the market candles. Can specify either retreive the latest x candles or a time range.
     * @param requestParameters - The range of the candles.
     */
    getBars(requestParameters: GetBarsRequest): Promise<RestApiResponse<GetBarsResponse>>;
    /**
     * Health check.
     */
    getHealth(): Promise<RestApiResponse<string>>;
    /**
     * Retrieves balance information for a specific asset and contract.
     * @param requestParameters - The asset ID and contract address.
     */
    getBalance(requestParameters: GetBalanceRequest): Promise<RestApiResponse<GetBalanceResponse>>;
    /**
     * Retrieves recent trades for a specific market.
     * @param requestParameters - The market ID, direction, and count of trades to retrieve.
     */
    getTrades(requestParameters: GetTradesRequest): Promise<RestApiResponse<GetTradesResponse>>;
    /**
     * Retrieves trades by account for a specific market and contract.
     * @param requestParameters - The market ID, contract address, direction, and count of trades to retrieve.
     */
    getTradesByAccount(requestParameters: GetTradesByAccountRequest): Promise<RestApiResponse<GetTradesByAccountResponse>>;
    /**
     * Retrieves order book depth for a specific market.
     * @param requestParameters - The market ID and precision for depth aggregation.
     */
    getDepth(requestParameters: GetDepthRequest): Promise<RestApiResponse<GetDepthResponse>>;
    /**
     * Retrieves orders for a specific market and contract.
     * @param requestParameters - The market ID, filters for orders and optional contract address.
     */
    getOrders(requestParameters: GetOrdersRequest): Promise<RestApiResponse<GetOrdersResponse>>;
    /**
     * Retrieves a single order by ID and market.
     * @param requestParameters - The order ID and market ID.
     */
    getOrder(requestParameters: GetOrderRequest): Promise<RestApiResponse<GetOrderResponse>>;
}
//# sourceMappingURL=client.d.ts.map