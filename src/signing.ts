import {
  AbstractContract,
  Account,
  Address,
  B256Address,
  BN,
  Contract,
  FunctionInvocationScope,
  Signer,
  arrayify,
  bn,
  concat,
  hexlify,
  BigNumberCoder,
  ZeroBytes32,
} from 'fuels';
import { toUtf8Bytes } from 'ethers';
import { createHash } from 'node:crypto';

import { TRADE_ACCOUNT_ABI } from './abis';
import type { Identity, SessionAction, API_CreateSessionRequest, API_SessionCallContractRequest } from './types';
import { OrderSide, OrderType } from './types';

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

  async sign(data: Uint8Array): Promise<{ Secp256k1: { bits: number[] } }> {
    const signature = this.signer.sign(sha256(data));
    const bytes = Array.from(arrayify(signature));
    return { Secp256k1: { bits: bytes as any } };
  }
}

function sha256(data: Uint8Array): Uint8Array {
  const hash = createHash('sha256');
  hash.update(Buffer.from(data));
  return new Uint8Array(hash.digest());
}

function getContract(bits: B256Address | Address) {
  return { ContractId: { bits: bits.toString() } };
}

function getAddress(bits: B256Address | Address) {
  return { Address: { bits: bits.toString() } };
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

function createCallToSign(
  nonce: string | number | bigint,
  chainId: string | number | bigint,
  invocationScope: FunctionInvocationScope<any>
) {
  const callConfig = invocationScope.getCallConfig();
  if (callConfig.func.jsonFn.inputs[0].name !== 'signature') {
    throw new Error('createCallToSign can only be used for functions with signature as the first argument');
  }
  let argBytes = callConfig.func.encodeArguments(callConfig.args);
  const [option] = new BigNumberCoder('u64').decode(argBytes.slice(0, 8), 0);
  if (!option.eq(0)) {
    argBytes = argBytes.slice(8 + 64);
  } else {
    argBytes = argBytes.slice(8);
  }
  const funcNameBytes = toUtf8Bytes(callConfig.func.jsonFn.name);
  const finalBytes = concat([
    new BigNumberCoder('u64').encode(bn(nonce.toString())),
    new BigNumberCoder('u64').encode(bn(chainId.toString())),
    new BigNumberCoder('u64').encode(funcNameBytes.length),
    funcNameBytes,
    argBytes,
  ]);
  return arrayify(finalBytes);
}

function callContractToBytes(callContractArg: {
  contractId: Uint8Array;
  functionSelector: Uint8Array | string;
  amount: BN;
  assetId: Uint8Array;
  gas: BN;
  args?: Uint8Array;
}): Uint8Array {
  const selectorBytes =
    typeof callContractArg.functionSelector === 'string'
      ? arrayify(callContractArg.functionSelector)
      : callContractArg.functionSelector;
  return concat([
    callContractArg.contractId,
    new BigNumberCoder('u64').encode(selectorBytes.length),
    selectorBytes,
    new BigNumberCoder('u64').encode(callContractArg.amount),
    arrayify(callContractArg.assetId),
    new BigNumberCoder('u64').encode(callContractArg.gas),
    callContractArg.args
      ? concat([
          new BigNumberCoder('u64').encode(callContractArg.args.length),
          callContractArg.args,
        ])
      : new BigNumberCoder('u64').encode(0),
  ]);
}

function createCallContractArg(invocationScope: FunctionInvocationScope<any>, gasLimit: BN) {
  const callConfig = invocationScope.getCallConfig();
  const forward = callConfig?.forward || {
    assetId: ZeroBytes32,
    amount: bn(0),
  };
  const variableOutputs = callConfig.txParameters?.variableOutputs || 0;
  const callGasLimit = gasLimit;
  const contract = callConfig.program as AbstractContract;
  const contractId = contract.id.toB256();
  const selectorBytes = arrayify(callConfig.func.selectorBytes);
  const argBytes = callConfig.func.encodeArguments(callConfig.args);
  return {
    contracts: [contract],
    callContractArgBytes: callContractToBytes({
      contractId: arrayify(contractId),
      functionSelector: selectorBytes,
      amount: bn(forward.amount),
      assetId: arrayify(forward.assetId),
      gas: bn(callGasLimit),
      args: argBytes,
    }),
    callContractArg: {
      contract_id: { bits: contractId },
      function_selector: selectorBytes,
      call_params: {
        coins: bn(forward.amount),
        asset_id: { bits: forward.assetId },
        gas: bn(callGasLimit).toString(),
      },
      call_data: argBytes,
    },
    variableOutputs,
  };
}

function calculateAmount(side: OrderSide, price: string, quantity: string, baseDecimals: number): BN {
  if (side === OrderSide.Buy) {
    return bn(((BigInt(price) * BigInt(quantity)) / BigInt(10 ** baseDecimals)).toString());
  }
  return bn(quantity);
}

function createOrderInvokeScope(
  order: { CreateOrder: { side: OrderSide; order_type: OrderType; price: string; quantity: string } },
  orderBook: Contract,
  orderBookConfig: { baseAssetId: B256Address; quoteAssetId: B256Address; baseDecimals: number; quoteDecimals: number },
  gasLimit: BN
) {
  const { side, order_type, price, quantity } = order.CreateOrder;
  const orderTypeInput: any = (() => {
    switch (order_type) {
      case OrderType.Spot:
        return { Spot: undefined };
      case OrderType.Market:
        return { Market: undefined };
      case OrderType.FillOrKill:
        return { FillOrKill: undefined };
      case OrderType.PostOnly:
        return { PostOnly: undefined };
      case OrderType.Limit:
      default:
        return { Limit: undefined };
    }
  })();

  const callData = {
    price: bn(price),
    quantity: bn(quantity),
    order_type: orderTypeInput,
  };

  const callParams = {
    forward: {
      assetId: side === OrderSide.Buy ? orderBookConfig.quoteAssetId : orderBookConfig.baseAssetId,
      amount: calculateAmount(side, price, quantity, orderBookConfig.baseDecimals),
    },
    gasLimit: gasLimit,
  };

  return (orderBook.functions as any).create_order(callData).callParams(callParams);
}

async function encodeActions(
  tradeAccountIdentity: { Address?: { bits: string }; ContractId?: { bits: string } },
  orderBook: Contract,
  orderBookConfig: { baseAssetId: B256Address; quoteAssetId: B256Address; baseDecimals: number; quoteDecimals: number },
  actions: SessionAction[] = [],
  gasLimit: BN
) {
  const invokeScopes: Array<FunctionInvocationScope<any>> = [];
  const newActions: SessionAction[] = [];

  if (actions.some((action) => 'CreateOrder' in action)) {
    invokeScopes.push((orderBook.functions as any).settle_balance(tradeAccountIdentity));
    newActions.push({ SettleBalance: { to: identityInputToIdentity(tradeAccountIdentity) } });
  }

  for (const action of actions) {
    if ('CreateOrder' in action) {
      invokeScopes.push(createOrderInvokeScope(action, orderBook, orderBookConfig, gasLimit));
      newActions.push(action);
    } else if ('CancelOrder' in action) {
      invokeScopes.push((orderBook.functions as any).cancel_order(action.CancelOrder.order_id));
      newActions.push(action);
    } else if ('SettleBalance' in action) {
      invokeScopes.push((orderBook.functions as any).settle_balance(tradeAccountIdentity));
      newActions.push({ SettleBalance: { to: identityInputToIdentity(tradeAccountIdentity) } });
    } else {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`);
    }
  }

  return { invokeScopes, actions: newActions };
}

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

  async signBytesWithSession(bytes: Uint8Array, length?: number) {
    const byteToSign = [new BigNumberCoder('u64').encode(this.nonce)];
    if (length) {
      byteToSign.push(new BigNumberCoder('u64').encode(length));
    }
    byteToSign.push(bytes);
    const payload = concat(byteToSign);
    return this.signer.sign(payload);
  }

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
    const bytesToSign = await createCallToSign(
      this.nonce.toString(),
      chainId,
      (this.contract.functions as any).set_session(undefined, session)
    );
    return {
      nonce: this.nonce.toString(),
      contract_id: this.contract.id.toB256(),
      contract_ids,
      session_id: { Address: this.signer.address.toB256() },
      signature: {
        Secp256k1: await this.account.signMessage(hexlify(bytesToSign)),
      },
      expiry: bn(session.expiry.unix).toString(),
    };
  }

  async api_SessionCallContractsParams(
    invocationScopes: Array<FunctionInvocationScope<any>>
  ): Promise<API_SessionCallContractRequest> {
    if (!this.session) throw new Error('Session not initialized');

    const callContracts = invocationScopes.map((call) => createCallContractArg(call, this.defaultGasLimit));
    const bytesToSign = concat(callContracts.map((call) => call.callContractArgBytes));
    const signature = await this.signBytesWithSession(bytesToSign, callContracts.length);

    const calls = callContracts.map(({ callContractArg }) => ({
      contract_id: removeBits(callContractArg.contract_id),
      function_selector: hexlify(callContractArg.function_selector),
      call_params: {
        coins: callContractArg.call_params.coins.toString(),
        asset_id: removeBits(callContractArg.call_params.asset_id),
        gas: callContractArg.call_params.gas.toString(),
      },
      call_data: callContractArg.call_data ? hexlify(callContractArg.call_data) : undefined,
    }));

    const variableOutputs = callContracts.reduce((acc, call) => acc + (call.variableOutputs || 0), 0);

    return {
      nonce: this.nonce.toString(),
      session_id: removeBits(this.signerIdentity),
      trade_account_id: this.contractId.toB256(),
      signature: removeBits(signature, true),
      calls,
      variable_outputs: variableOutputs,
    };
  }
}

export async function encodeSessionActions(
  manager: TradeAccountManager,
  orderBook: Contract,
  actions: SessionAction[],
  market: { base: { asset: string; decimals: number }; quote: { asset: string; decimals: number } }
) {
  return encodeActions(
    manager.identity,
    orderBook,
    {
      baseAssetId: market.base.asset as B256Address,
      quoteAssetId: market.quote.asset as B256Address,
      baseDecimals: market.base.decimals,
      quoteDecimals: market.quote.decimals,
    },
    actions,
    manager.defaultGasLimit
  );
}

export function createSessionSigner() {
  return new FuelSessionSigner();
}
