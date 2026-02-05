"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
exports.shortenAxiosError = shortenAxiosError;
const axios_1 = __importDefault(require("axios"));
const axios_2 = require("axios");
/**
 * Delays execution for a specified number of milliseconds.
 */
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Determines whether a request should be retried based on the error.
 */
const shouldRetryRequest = function (error, method, retriesLeft) {
    const isRetriableMethod = ['GET', 'DELETE'].includes(method ?? '');
    const status = error?.response?.status ?? 0;
    const isRetriableStatus = [500, 502, 503, 504].includes(status);
    const isNetworkError = !error?.response;
    return (retriesLeft ?? 0) > 0 && isRetriableMethod && (isRetriableStatus || isNetworkError);
};
/**
 * Converts a URL object to a full path string, including pathname, search parameters, and hash.
 *
 * @param url The URL object to convert to a path string.
 * @returns A complete path string representation of the URL.
 */
const toPathString = function (url) {
    return url.pathname + url.search + url.hash;
};
/**
 * The core HTTP request function with retry and backoff logic.
 */
const httpRequestFunction = async function (axiosArgs, configuration) {
    const axiosRequestArgs = {
        ...axiosArgs.options,
        url: (axios_1.default.defaults?.baseURL ? '' : (configuration?.basePath ?? '')) + axiosArgs.url,
    };
    const retries = configuration?.retries ?? 0;
    const backoff = configuration?.backoff ?? 300; // Default backoff
    let lastError = new Error('Request failed after all retries.');
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await axios_1.default.request({
                ...axiosRequestArgs,
                responseType: 'text', // Always get raw text to handle parsing manually
            });
            return {
                data: async () => {
                    try {
                        return JSON.parse(response.data);
                    }
                    catch (err) {
                        // Provide a more descriptive error
                        throw new Error(`Failed to parse JSON response: ${err}. Response body: "${response.data}"`);
                    }
                },
                status: response.status,
            };
        }
        catch (error) {
            lastError = error;
            const axiosError = error;
            const retriesLeft = retries - attempt;
            if (shouldRetryRequest(axiosError, axiosRequestArgs?.method, retriesLeft)) {
                if (retriesLeft > 0) {
                    await delay(backoff * (attempt + 1)); // Increase backoff duration with each attempt
                }
            }
            else {
                throw axiosError; // If not retriable, throw immediately
            }
        }
    }
    throw lastError; // Throw the last captured error if all retries fail
};
/**
 * Generic function to send a request with optional API key and signature.
 * @param endpoint - The API endpoint to call.
 * @param method - HTTP method to use (GET, POST, DELETE, etc.).
 * @param params - Query parameters for the request.
 * @param options - Additional request options (ownerId).
 * @returns A promise resolving to the response data object.
 */
const sendRequest = async function (configuration, endpoint, method, params = {}, options = {}) {
    const localVarUrlObj = new URL(endpoint, configuration?.basePath);
    const localVarRequestOptions = {
        method,
        ...configuration?.baseOptions,
    };
    if (method === 'GET' || method === 'DELETE') {
        localVarRequestOptions.params = params;
    }
    else {
        localVarRequestOptions.data = params;
    }
    // Add owner id if API call requires it
    if (options.ownerId) {
        localVarRequestOptions.headers = {
            ...localVarRequestOptions.headers,
            'O2-Owner-Id': options.ownerId,
        };
    }
    return httpRequestFunction({
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
    }, configuration);
};
exports.sendRequest = sendRequest;
function shortenAxiosError(err) {
    if (!(0, axios_2.isAxiosError)(err))
        return err;
    const axiosError = err;
    let errorReason;
    const responseData = axiosError.response?.data;
    if (typeof responseData === 'string') {
        try {
            // Extract just the revert reason, ignoring the receipts
            errorReason = JSON.parse(responseData).reason?.split(',')[0];
        }
        catch {
            errorReason = responseData;
        }
    }
    else if (responseData && typeof responseData === 'object') {
        errorReason = JSON.stringify(responseData);
    }
    return {
        status: axiosError.message,
        request: `${axiosError.config?.method?.toUpperCase()} ${axiosError.config?.url}`,
        body: axiosError.config?.data,
        reason: errorReason,
    };
}
//# sourceMappingURL=httpRequest.js.map