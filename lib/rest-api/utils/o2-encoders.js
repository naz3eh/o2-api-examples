"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCallToSign = createCallToSign;
exports.encodeActions = encodeActions;
exports.getContract = getContract;
exports.getAddress = getAddress;
exports.createCallContractArg = createCallContractArg;
exports.removeBits = removeBits;
exports.identityInputToIdentity = identityInputToIdentity;
exports.hexPad = hexPad;
const fuels_1 = require("fuels");
const ethers_1 = require("ethers");
const types_1 = require("../types");
function createCallToSign(nonce, chainId, invocationScope) {
    const callConfig = invocationScope.getCallConfig();
    if (callConfig.func.jsonFn.inputs[0].name !== 'signature') {
        throw new Error('TradeAccountManager.createCallToSign can only be used for functions with signature as the first argument');
    }
    let argBytes = callConfig.func.encodeArguments(callConfig.args);
    const [option] = new fuels_1.BigNumberCoder('u64').decode(argBytes.slice(0, 8), 0);
    if (!option.eq(0)) {
        argBytes = argBytes.slice(8 + 64);
    }
    else {
        argBytes = argBytes.slice(8);
    }
    const funcNameBytes = (0, ethers_1.toUtf8Bytes)(callConfig.func.jsonFn.name);
    const finalBytes = (0, fuels_1.concat)([
        new fuels_1.BigNumberCoder('u64').encode((0, fuels_1.bn)(nonce.toString())),
        new fuels_1.BigNumberCoder('u64').encode((0, fuels_1.bn)(chainId.toString())),
        new fuels_1.BigNumberCoder('u64').encode(funcNameBytes.length),
        funcNameBytes,
        argBytes,
    ]);
    return (0, fuels_1.arrayify)(finalBytes);
}
async function encodeActions(tradeAccountIdentity, orderBook, orderBookConfig, actions = [], gasLimit) {
    const invokeScopes = [];
    const newActions = [];
    if (actions.some((action) => 'CreateOrder' in action)) {
        invokeScopes.push(orderBook.functions.settle_balance(tradeAccountIdentity));
        newActions.push({
            SettleBalance: {
                to: identityInputToIdentity(tradeAccountIdentity),
            },
        });
    }
    for (const action of actions) {
        if ('CreateOrder' in action) {
            invokeScopes.push(createOrderInvokeScope(action, orderBook, orderBookConfig, gasLimit));
            newActions.push(action);
        }
        else if ('CancelOrder' in action) {
            invokeScopes.push(orderBook.functions.cancel_order(action.CancelOrder.order_id));
            newActions.push(action);
        }
        else if ('SettleBalance' in action) {
            invokeScopes.push(orderBook.functions.settle_balance(tradeAccountIdentity));
            newActions.push({
                SettleBalance: {
                    to: identityInputToIdentity(tradeAccountIdentity),
                },
            });
        }
        else {
            throw new Error(`Unsupported action type: ${JSON.stringify(action)}`);
        }
    }
    return { invokeScopes, actions: newActions };
}
function getContract(bits) {
    return { ContractId: getBits(bits) };
}
function getAddress(bits) {
    return { Address: getBits(bits) };
}
function getBits(bits) {
    return { bits: bits.toString() };
}
function getOption(args) {
    if (args) {
        return (0, fuels_1.concat)([new fuels_1.BigNumberCoder('u64').encode(1), args]);
    }
    return new fuels_1.BigNumberCoder('u64').encode(0);
}
function createOrderArgs(createOrder, bookConfig, gasLimit) {
    let order_type;
    switch (createOrder.CreateOrder.order_type) {
        case types_1.OrderType.Spot:
            order_type = { Spot: undefined };
            break;
        case types_1.OrderType.Market:
            order_type = { Market: undefined };
            break;
        case types_1.OrderType.FillOrKill:
            order_type = { FillOrKill: undefined };
            break;
        case types_1.OrderType.PostOnly:
            order_type = { PostOnly: undefined };
            break;
        case types_1.OrderType.Limit:
        default:
            throw new Error('unsupported order type');
    }
    return {
        call_data: {
            price: (0, fuels_1.bn)(createOrder.CreateOrder.price.toString()),
            quantity: (0, fuels_1.bn)(createOrder.CreateOrder.quantity.toString()),
            order_type,
        },
        call_params: {
            forward: {
                assetId: createOrder.CreateOrder.side === types_1.OrderSide.Buy
                    ? bookConfig.quoteAssetId
                    : bookConfig.baseAssetId,
                amount: calculateAmount(createOrder.CreateOrder.side, createOrder.CreateOrder.price, createOrder.CreateOrder.quantity, bookConfig.baseDecimals),
            },
            gasLimit: gasLimit,
        },
    };
}
function createCallContractArg(invocationScope, gasLimit) {
    const callConfig = invocationScope.getCallConfig();
    const forward = callConfig?.forward || {
        assetId: fuels_1.ZeroBytes32,
        amount: (0, fuels_1.bn)(0),
    };
    const variableOutputs = callConfig.txParameters?.variableOutputs || 0;
    const callGasLimit = gasLimit;
    const contract = callConfig.program;
    const contractId = contract.id.toB256();
    const selectorBytes = callConfig.func.selectorBytes;
    const argBytes = callConfig.func.encodeArguments(callConfig.args);
    return {
        contracts: [contract],
        callContractArgBytes: callContractToBytes({
            contractId,
            functionSelector: (0, fuels_1.hexlify)(selectorBytes),
            amount: (0, fuels_1.bn)(forward.amount),
            assetId: forward.assetId,
            gas: (0, fuels_1.bn)(callGasLimit),
            args: argBytes,
        }),
        callContractArg: {
            contract_id: getBits(contractId),
            function_selector: selectorBytes,
            call_params: {
                coins: (0, fuels_1.bn)(forward.amount),
                asset_id: getBits(forward.assetId),
                gas: (0, fuels_1.bn)(callGasLimit).toString(),
            },
            call_data: argBytes,
        },
        variableOutputs,
    };
}
function removeBits(data, convertToHex = false) {
    if (data && typeof data === 'object') {
        if (data.bits) {
            return data.bits;
        }
        for (const key in data) {
            if ('bits' in data[key]) {
                const value = data[key].bits;
                data[key] = value;
                if (convertToHex && value instanceof Array) {
                    data[key] = (0, fuels_1.hexlify)(Uint8Array.from(value));
                }
            }
            else if (typeof data[key] === 'object') {
                return removeBits(data[key], convertToHex);
            }
        }
    }
    return data;
}
function identityInputToIdentity(identityInput) {
    if (identityInput.Address) {
        return { Address: identityInput.Address.bits };
    }
    if (identityInput.ContractId) {
        return { ContractId: identityInput.ContractId.bits };
    }
    throw new Error('Invalid identity input');
}
function hexPad(hex = '') {
    if (hex === undefined || hex === null || hex === '') {
        return null;
    }
    if (hex.startsWith('0x')) {
        return hex;
    }
    return `0x${hex.toLowerCase()}`;
}
function createOrderInvokeScope(createOrder, orderBook, orderBookConfig, gasLimit) {
    const { call_data, call_params } = createOrderArgs(createOrder, orderBookConfig, gasLimit);
    return orderBook.functions.create_order(call_data).callParams(call_params);
}
function callContractToBytes(callContractArg) {
    return (0, fuels_1.concat)([
        callContractArg.contractId,
        new fuels_1.BigNumberCoder('u64').encode((0, fuels_1.arrayify)(callContractArg.functionSelector).length),
        callContractArg.functionSelector,
        new fuels_1.BigNumberCoder('u64').encode(callContractArg.amount),
        (0, fuels_1.arrayify)(callContractArg.assetId),
        new fuels_1.BigNumberCoder('u64').encode(callContractArg.gas),
        getOption(callContractArg.args
            ? (0, fuels_1.concat)([new fuels_1.BigNumberCoder('u64').encode(callContractArg.args?.length || 0), callContractArg.args])
            : undefined),
    ]);
}
function calculateAmount(side, price, quantity, base_decimals) {
    if (side === types_1.OrderSide.Buy) {
        return (0, fuels_1.bn)(((BigInt(price.toString()) * BigInt(quantity.toString())) / BigInt(10 ** base_decimals)).toString());
    }
    return (0, fuels_1.bn)(quantity.toString());
}
//# sourceMappingURL=o2-encoders.js.map