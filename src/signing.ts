import {
  Account,
  Address,
  B256Address,
  B256Coder,
  BN,
  BigNumberCoder,
  Contract,
  EnumCoder,
  OptionCoder,
  Signer,
  StructCoder,
  TupleCoder,
  VecCoder,
  ZeroBytes32,
  arrayify,
  bn,
  concat,
  hexlify,
  sha256,
  toUtf8Bytes
} from 'fuels';

import { TRADE_ACCOUNT_ABI } from './abis';
import type { API_CreateSessionRequest, Identity, SessionAction } from './types';
import { OrderSide, OrderType } from './types';

// ========== Coders ==========

const U64_CODER = new BigNumberCoder('u64');
const B256_C = new B256Coder();
const ADDRESS_CODER = new StructCoder('Address', { bits: B256_C });
const CONTRACT_ID_CODER = new StructCoder('ContractId', { bits: B256_C });
const IDENTITY_CODER = new EnumCoder('Identity', {
  Address: ADDRESS_CODER,
  ContractId: CONTRACT_ID_CODER,
});
const TIME_CODER = new StructCoder('Time', { unix: U64_CODER });
const CONTRACT_IDS_CODER = new VecCoder(CONTRACT_ID_CODER);
const SESSION_CODER = new StructCoder('Session', {
  session_id: IDENTITY_CODER,
  expiry: TIME_CODER,
  contract_ids: CONTRACT_IDS_CODER,
});
const SESSION_OPTION_CODER = new OptionCoder('Option<Session>', {
  None: new TupleCoder([]),
  Some: SESSION_CODER,
});

const ORDER_TYPE_CODER = new EnumCoder('OrderType', {
  Limit: new TupleCoder([U64_CODER, TIME_CODER]),
  Spot: new TupleCoder([]),
  FillOrKill: new TupleCoder([]),
  PostOnly: new TupleCoder([]),
  Market: new TupleCoder([]),
  BoundedMarket: new TupleCoder([U64_CODER, U64_CODER]),
});
const ORDER_ARGS_CODER = new StructCoder('OrderArgs', {
  price: U64_CODER,
  quantity: U64_CODER,
  order_type: ORDER_TYPE_CODER,
});

// ========== Session Signer ==========

class FuelSessionSigner {
  private signer: Signer;

  constructor(privateKey?: B256Address) {
    this.signer = FuelSessionSigner.createSigner(privateKey);
  }

  static createSigner(privateKey?: B256Address): Signer {
    if (privateKey) return new Signer(privateKey);
    return new Signer(Signer.generatePrivateKey());
  }

  get address(): Address {
    return this.signer.address;
  }

  sign(data: Uint8Array): string {
    return this.signer.sign(sha256(data));
  }
}

// ========== Helper Functions ==========

const FUEL_MESSAGE_PREFIX = '\x19Fuel Signed Message:\n';

function hashPersonalMessage(message: Uint8Array): string {
  const payload = concat([
    toUtf8Bytes(FUEL_MESSAGE_PREFIX),
    toUtf8Bytes(String(message.length)),
    message,
  ]);
  return sha256(payload);
}

function getContract(bits: B256Address | Address) {
  return { ContractId: { bits: bits.toString() } };
}

function getAddress(bits: B256Address | Address) {
  return { Address: { bits: bits.toString() } };
}

function getOption(args?: Uint8Array) {
  if (args) {
    return concat([U64_CODER.encode(1), args]);
  }
  return U64_CODER.encode(0);
}

function removeBits(data: any, convertToHex = false): any {
  if (data && typeof data === 'object') {
    if (data.bits) {
      return data.bits;
    }
    for (const key in data) {
      if (data[key] && typeof data[key] === 'object' && 'bits' in data[key]) {
        const value = data[key].bits;
        data[key] = convertToHex && value instanceof Array ? hexlify(Uint8Array.from(value)) : value;
      } else if (typeof data[key] === 'object') {
        removeBits(data[key], convertToHex);
      }
    }
  }
  return data;
}

function identityInputToIdentity(identityInput: { Address?: { bits: string }; ContractId?: { bits: string } }): Identity {
  if (identityInput.Address) {
    return { Address: identityInput.Address.bits };
  }
  if (identityInput.ContractId) {
    return { ContractId: identityInput.ContractId.bits };
  }
  throw new Error('Invalid identity input');
}

function encodeFunctionSelector(name: string): Uint8Array {
  const nameBytes = toUtf8Bytes(name);
  return concat([U64_CODER.encode(name.length), nameBytes]);
}

/**
 * Build the bytes to sign for a contract function call.
 * pattern:
 *   nonce + chainId + funcNameLen + funcName + argBytes
 */
function createCallToSign(
  nonce: number,
  chainId: number,
  funcName: string,
  argBytes: Uint8Array
): Uint8Array {
  const funcNameBytes = toUtf8Bytes(funcName);
  return concat([
    U64_CODER.encode(nonce),
    U64_CODER.encode(chainId),
    U64_CODER.encode(funcNameBytes.length),
    funcNameBytes,
    argBytes,
  ]);
}

/**
 * Encode call contract to bytes for session signing.
 * Uses name-based function selector (length + utf8_name).
 */
function callContractToBytes(params: {
  contractId: string;
  functionSelector: string;
  amount: BN;
  assetId: string;
  gas: BN;
  args?: Uint8Array;
}): Uint8Array {
  const selectorBytes = arrayify(params.functionSelector);
  return concat([
    params.contractId,
    U64_CODER.encode(selectorBytes.length),
    selectorBytes,
    U64_CODER.encode(params.amount),
    arrayify(params.assetId),
    U64_CODER.encode(params.gas),
    getOption(
      params.args
        ? concat([U64_CODER.encode(params.args.length), params.args])
        : undefined
    ),
  ]);
}

function calculateAmount(side: OrderSide, price: string, quantity: string, baseDecimals: number): BN {
  if (side === OrderSide.Buy) {
    return bn(((BigInt(price) * BigInt(quantity)) / BigInt(10 ** baseDecimals)).toString());
  }
  return bn(quantity);
}

/**
 * Encode a CreateOrder action into callContractArg bytes.
 * Uses manual ORDER_ARGS_CODER (matching working script) instead of ABI encoding.
 */
function encodeCreateOrderCall(
  order: { CreateOrder: { side: OrderSide; order_type: OrderType; price: string; quantity: string } },
  orderBookContractId: string,
  orderBookConfig: { baseAssetId: B256Address; quoteAssetId: B256Address; baseDecimals: number; quoteDecimals: number },
  gasLimit: BN
) {
  const { side, order_type, price, quantity } = order.CreateOrder;

  const orderTypeValue = (() => {
    switch (order_type) {
      case OrderType.Spot: return { Spot: [] };
      case OrderType.Market: return { Market: [] };
      case OrderType.FillOrKill: return { FillOrKill: [] };
      case OrderType.PostOnly: return { PostOnly: [] };
      default: throw new Error(`Unsupported order type: ${order_type}`);
    }
  })();

  const orderArgs = {
    price: bn(price),
    quantity: bn(quantity),
    order_type: orderTypeValue,
  };
  const argBytes = ORDER_ARGS_CODER.encode(orderArgs);

  const forwardAmount = calculateAmount(side, price, quantity, orderBookConfig.baseDecimals);
  const forwardAssetId = side === OrderSide.Buy ? orderBookConfig.quoteAssetId : orderBookConfig.baseAssetId;

  const selectorBytes = encodeFunctionSelector('create_order');

  return {
    callContractArgBytes: callContractToBytes({
      contractId: orderBookContractId,
      functionSelector: hexlify(selectorBytes),
      amount: forwardAmount,
      assetId: forwardAssetId,
      gas: gasLimit,
      args: argBytes,
    }),
    variableOutputs: 0,
  };
}

/**
 * Encode a settle_balance call into callContractArg bytes.
 */
function encodeSettleBalanceCall(
  tradeAccountIdentity: { Address?: { bits: string }; ContractId?: { bits: string } },
  orderBookContractId: string,
  gasLimit: BN
) {
  // settle_balance takes an Identity argument
  const argBytes = IDENTITY_CODER.encode(tradeAccountIdentity as any);
  const selectorBytes = encodeFunctionSelector('settle_balance');

  return {
    callContractArgBytes: callContractToBytes({
      contractId: orderBookContractId,
      functionSelector: hexlify(selectorBytes),
      amount: bn(0),
      assetId: ZeroBytes32,
      gas: gasLimit,
      args: argBytes,
    }),
    variableOutputs: 0,
  };
}

/**
 * Encode a cancel_order call into callContractArg bytes.
 */
function encodeCancelOrderCall(
  orderId: string,
  orderBookContractId: string,
  gasLimit: BN
) {
  const argBytes = B256_C.encode(orderId);
  const selectorBytes = encodeFunctionSelector('cancel_order');

  return {
    callContractArgBytes: callContractToBytes({
      contractId: orderBookContractId,
      functionSelector: hexlify(selectorBytes),
      amount: bn(0),
      assetId: ZeroBytes32,
      gas: gasLimit,
      args: argBytes,
    }),
    variableOutputs: 0,
  };
}

/**
 * Encode actions into callContractArgBytes for session signing.
 * Automatically prepends a settle_balance call when there are CreateOrder actions.
 */
function encodeActionsToCallBytes(
  tradeAccountIdentity: { Address?: { bits: string }; ContractId?: { bits: string } },
  orderBookContractId: string,
  orderBookConfig: { baseAssetId: B256Address; quoteAssetId: B256Address; baseDecimals: number; quoteDecimals: number },
  actions: SessionAction[],
  gasLimit: BN
): { callBytesArray: Uint8Array[]; actions: SessionAction[] } {
  const callBytesArray: Uint8Array[] = [];
  const newActions: SessionAction[] = [];

  // Auto-prepend settle_balance if there are CreateOrder actions
  if (actions.some((action) => 'CreateOrder' in action)) {
    const settleCall = encodeSettleBalanceCall(tradeAccountIdentity, orderBookContractId, gasLimit);
    callBytesArray.push(settleCall.callContractArgBytes);
    newActions.push({ SettleBalance: { to: identityInputToIdentity(tradeAccountIdentity) } });
  }

  for (const action of actions) {
    if ('CreateOrder' in action) {
      const call = encodeCreateOrderCall(action, orderBookContractId, orderBookConfig, gasLimit);
      callBytesArray.push(call.callContractArgBytes);
      newActions.push(action);
    } else if ('CancelOrder' in action) {
      const call = encodeCancelOrderCall(action.CancelOrder.order_id, orderBookContractId, gasLimit);
      callBytesArray.push(call.callContractArgBytes);
      newActions.push(action);
    } else if ('SettleBalance' in action) {
      const settleCall = encodeSettleBalanceCall(tradeAccountIdentity, orderBookContractId, gasLimit);
      callBytesArray.push(settleCall.callContractArgBytes);
      newActions.push({ SettleBalance: { to: identityInputToIdentity(tradeAccountIdentity) } });
    } else {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`);
    }
  }

  return { callBytesArray, actions: newActions };
}

// ========== TradeAccountManager ==========

export class TradeAccountManager {
  readonly account: Account;
  readonly signer: FuelSessionSigner;
  readonly contract: Contract;
  readonly defaultGasLimit: BN;
  private _nonce: BN = bn(0);
  private session: any;

  constructor(config: {
    signer: FuelSessionSigner;
    account: Account;
    tradeAccountId: B256Address;
    contractIds: string[];
    defaultGasLimit?: string | number | bigint;
  }) {
    this.account = config.account;
    this.signer = config.signer;
    this.contract = new Contract(config.tradeAccountId, TRADE_ACCOUNT_ABI as any, this.account);
    this.defaultGasLimit = config.defaultGasLimit ? bn(config.defaultGasLimit.toString()) : bn('18446744073709551615');
  }

  get nonce(): BN {
    return this._nonce;
  }

  get contractId(): Address {
    return this.contract.id as Address;
  }

  get identity() {
    return getContract(this.contract.id.toB256() as B256Address);
  }

  get signerIdentity() {
    return getAddress(this.signer.address);
  }

  get ownerAddress() {
    return this.account.address;
  }

  setNonce(nonce: string | number | bigint) {
    this._nonce = bn(nonce.toString());
  }

  incrementNonce() {
    this._nonce = this._nonce.add(bn(1));
    return this._nonce;
  }

  async fetchNonce() {
    const { value } = await (this.contract.functions as any).get_nonce().get();
    this._nonce = value;
    return this._nonce;
  }

  async recoverSession() {
    const { value } = await (this.contract.functions as any).get_current_session().get();
    if (!value) throw new Error('Session not found');
    this.session = value;
    return this.session;
  }

  setSession(session: any) {
    this.session = session;
  }

  /**
   * Create session params for PUT /v1/session.
   * Uses manual SESSION_OPTION_CODER + hashPersonalMessage + direct Signer.sign
   */
  async api_CreateSessionParams(contract_ids: string[], expiry: string | number | bigint): Promise<API_CreateSessionRequest> {
    if (!contract_ids || contract_ids.length === 0) {
      throw new Error('session must specify at least one allowed contract');
    }

    const session = {
      session_id: getAddress(this.signer.address),
      expiry: { unix: bn(expiry.toString()) },
      contract_ids: contract_ids.map((id) => ({ bits: id })),
    };

    const chainId = await this.account.provider.getChainId();

    // Manual encoding
    const sessionArgBytes = SESSION_OPTION_CODER.encode(session);
    const bytesToSign = createCallToSign(
      this.nonce.toNumber(),
      chainId,
      'set_session',
      sessionArgBytes
    );

    // Personal sign: hash with prefix, then sign with owner's Signer
    const messageHash = hashPersonalMessage(bytesToSign);
    const ownerSigner = new Signer((this.account as any).privateKey);
    const signature = ownerSigner.sign(messageHash);

    return {
      nonce: this.nonce.toString(),
      contract_id: this.contract.id.toB256(),
      contract_ids,
      session_id: { Address: this.signer.address.toB256() },
      signature: { Secp256k1: signature },
      expiry: bn(session.expiry.unix).toString(),
    };
  }

  /**
   * Create params for POST /v1/session/actions.
   * Signs the call bytes with the session signer (sha256 + sign).
   */
  async api_SessionCallContractsParams(
    orderBookContractId: string,
    orderBookConfig: { baseAssetId: B256Address; quoteAssetId: B256Address; baseDecimals: number; quoteDecimals: number },
    actions: SessionAction[]
  ): Promise<{
    nonce: string;
    session_id: { Address: string };
    trade_account_id: string;
    signature: { Secp256k1: string };
    variable_outputs: number;
    actions: SessionAction[];
  }> {
    if (!this.session) throw new Error('Session not initialized');

    const tradeAccountIdentity = this.identity;
    const encoded = encodeActionsToCallBytes(
      tradeAccountIdentity,
      orderBookContractId,
      orderBookConfig,
      actions,
      this.defaultGasLimit
    );

    // Sign: nonce + numCalls + concat(callBytes)
    const numCalls = encoded.callBytesArray.length;
    const allCallBytes = concat(encoded.callBytesArray);
    const sessionBytesToSign = concat([
      U64_CODER.encode(this.nonce),
      U64_CODER.encode(numCalls),
      allCallBytes,
    ]);
    const signature = this.signer.sign(sessionBytesToSign);

    return {
      nonce: this.nonce.toString(),
      session_id: { Address: this.signer.address.toB256() },
      trade_account_id: this.contractId.toB256(),
      signature: { Secp256k1: signature },
      variable_outputs: 0,
      actions: encoded.actions,
    };
  }
}

// ========== Exports ==========

export async function encodeSessionActions(
  manager: TradeAccountManager,
  orderBookContractId: string,
  actions: SessionAction[],
  market: { base: { asset: string; decimals: number }; quote: { asset: string; decimals: number } }
) {
  return manager.api_SessionCallContractsParams(
    orderBookContractId,
    {
      baseAssetId: market.base.asset as B256Address,
      quoteAssetId: market.quote.asset as B256Address,
      baseDecimals: market.base.decimals,
      quoteDecimals: market.quote.decimals,
    },
    actions
  );
}

export function createSessionSigner() {
  return new FuelSessionSigner();
}
