import type { ConfigurationRestAPI, RestApiResponse, CreateTradingAccountRequest, CreateTradingAccountResponse, API_CreateSessionRequest } from '../types';
import type { SessionInput } from '../../types/contracts/TradeAccount';
export declare class AccountApi {
    private readonly configuration;
    constructor(configuration: ConfigurationRestAPI);
    createTradingAccount(requestParameters: CreateTradingAccountRequest): Promise<RestApiResponse<CreateTradingAccountResponse>>;
    createSession(requestParameters: API_CreateSessionRequest, ownerId: string): Promise<RestApiResponse<SessionInput>>;
}
//# sourceMappingURL=account-api.d.ts.map