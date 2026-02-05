import type { ConfigurationRestAPI, RestApiResponse, SessionSubmitTransactionRequest, SessionSubmitTransactionResponse } from '../types';
export declare class SessionApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    sessionSubmitTransaction(requestParameters: SessionSubmitTransactionRequest, ownerId: string): Promise<RestApiResponse<SessionSubmitTransactionResponse>>;
}
//# sourceMappingURL=session-api.d.ts.map