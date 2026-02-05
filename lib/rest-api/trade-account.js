"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeAccountManager = void 0;
const fuels_1 = require("fuels");
const fuels_2 = require("fuels");
const o2_encoders_1 = require("./utils/o2-encoders");
const types_1 = require("../types");
const GAS_LIMIT_DEFAULT = (0, fuels_2.bn)('18446744073709551615');
class TradeAccountManager {
    account;
    signer;
    contract;
    defaultGasLimit;
    _nonce = (0, fuels_2.bn)(0);
    session;
    constructor(config) {
        this.account = config.account;
        if (!config.tradeAccountId) {
            throw new Error('tradeAccountId must be defined');
        }
        this.contract = new types_1.TradeAccount(config.tradeAccountId, this.account);
        this.signer = config.signer;
        this.defaultGasLimit = config.defaultGasLimit ? (0, fuels_2.bn)(config.defaultGasLimit.toString()) : GAS_LIMIT_DEFAULT;
    }
    get nonce() {
        return this._nonce;
    }
    get contractId() {
        return this.contract.id;
    }
    get identity() {
        return (0, o2_encoders_1.getContract)(this.contract.id);
    }
    get signerAddress() {
        return this.signer.address;
    }
    get signerIdentity() {
        return (0, o2_encoders_1.getAddress)(this.signer.address);
    }
    get ownerAddress() {
        return this.account.address;
    }
    async recoverSession() {
        const { value } = await this.contract.functions.get_current_session().get();
        if (!value) {
            throw new Error('Session not found');
        }
        this.session = value;
        return this.session;
    }
    setSession(session) {
        this.session = session;
    }
    async fetchNonce() {
        const { value } = await this.contract.functions.get_nonce().get();
        this._nonce = value;
        return this._nonce;
    }
    setNonce(nonce) {
        this._nonce = (0, fuels_2.bn)(nonce.toString());
    }
    incrementNonce() {
        this._nonce = this._nonce.add((0, fuels_2.bn)(1));
        return this._nonce;
    }
    async signBytesWithSession(bytes, length) {
        if (!this.signer) {
            throw new Error('Session not initialized');
        }
        const byteToSign = [new fuels_1.BigNumberCoder('u64').encode(this.nonce)];
        if (length) {
            byteToSign.push(new fuels_1.BigNumberCoder('u64').encode(length));
        }
        byteToSign.push(bytes);
        return this.signer.sign((0, fuels_1.concat)(byteToSign));
    }
    async api_CreateSessionParams(contract_ids, expiry) {
        // Required
        if (!contract_ids || contract_ids.length === 0) {
            throw new Error('session must specify at least one allowed contract');
        }
        // Format
        const session = {
            session_id: (0, o2_encoders_1.getAddress)(this.signer.address),
            expiry: {
                unix: (0, fuels_2.bn)((expiry ?? Date.now() + 30 * 24 * 60 * 60 * 1000).toString()),
            },
            contract_ids: contract_ids.map((id) => ({ bits: id })),
        };
        const chainId = await this.account.provider.getChainId();
        const bytesToSign = await (0, o2_encoders_1.createCallToSign)(this.nonce, chainId, this.contract.functions.set_session(undefined, session));
        return {
            nonce: this.nonce.toString(),
            contract_id: this.contract.id.toB256(),
            contract_ids,
            session_id: {
                Address: this.signer.address.toB256(),
            },
            signature: {
                Secp256k1: await this.account.signMessage({
                    personalSign: bytesToSign,
                }),
            },
            expiry: (0, fuels_2.bn)(session.expiry.unix).toString(),
        };
    }
    async api_SessionCallContractsParams(invocationScopes) {
        if (!this.session) {
            throw new Error('Session not initialized');
        }
        const callContracts = invocationScopes.map((call) => (0, o2_encoders_1.createCallContractArg)(call, this.defaultGasLimit));
        const bytesToSign = (0, fuels_1.concat)(callContracts.map((call) => call.callContractArgBytes));
        const signature = await this.signBytesWithSession(bytesToSign, callContracts.length);
        const calls = callContracts.map(({ callContractArg }) => ({
            contract_id: (0, o2_encoders_1.removeBits)(callContractArg.contract_id),
            function_selector: (0, fuels_1.hexlify)(callContractArg.function_selector),
            call_params: {
                coins: callContractArg.call_params.coins.toString(),
                asset_id: (0, o2_encoders_1.removeBits)(callContractArg.call_params.asset_id),
                gas: callContractArg.call_params.gas.toString(),
            },
            call_data: callContractArg.call_data ? (0, fuels_1.hexlify)(callContractArg.call_data) : undefined,
        }));
        const variableOutputs = callContracts.reduce((acc, call) => {
            return acc + (call.variableOutputs || 0);
        }, 0);
        return {
            nonce: this.nonce.toString(),
            session_id: (0, o2_encoders_1.removeBits)(this.signerIdentity),
            trade_account_id: this.contractId.toB256(),
            signature: (0, o2_encoders_1.removeBits)(signature, true),
            calls,
            variable_outputs: variableOutputs,
        };
    }
}
exports.TradeAccountManager = TradeAccountManager;
//# sourceMappingURL=trade-account.js.map