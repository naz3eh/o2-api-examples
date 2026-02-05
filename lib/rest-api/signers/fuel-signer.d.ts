import { Signer } from 'fuels';
import type { B256Address, Address } from 'fuels';
import { SessionSigner } from '../types';
import { SignatureInput } from '../../types/contracts/TradeAccount';
export declare class FuelSessionSigner implements SessionSigner {
    private signer;
    constructor(privateKey?: B256Address);
    static createSigner(privateKey?: B256Address): Signer;
    get address(): Address;
    sign(data: Uint8Array): Promise<SignatureInput>;
}
//# sourceMappingURL=fuel-signer.d.ts.map