import type { ConfigurationRestAPI, RestApiResponse } from '../types';
/**
 * Generic function to send a request with optional API key and signature.
 * @param endpoint - The API endpoint to call.
 * @param method - HTTP method to use (GET, POST, DELETE, etc.).
 * @param params - Query parameters for the request.
 * @param options - Additional request options (ownerId).
 * @returns A promise resolving to the response data object.
 */
export declare const sendRequest: <T>(configuration: ConfigurationRestAPI, endpoint: string, method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH", params?: Record<string, unknown>, options?: {
    ownerId?: string;
}) => Promise<RestApiResponse<T>>;
export declare function shortenAxiosError(err: unknown): unknown;
//# sourceMappingURL=httpRequest.d.ts.map