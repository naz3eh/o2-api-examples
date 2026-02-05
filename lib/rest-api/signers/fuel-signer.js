"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelSessionSigner = void 0;
const fuels_1 = require("fuels");
class FuelSessionSigner {
    signer;
    constructor(privateKey) {
        this.signer = FuelSessionSigner.createSigner(privateKey);
    }
    static createSigner(privateKey) {
        if (privateKey)
            return new fuels_1.Signer(privateKey);
        return new fuels_1.Signer(fuels_1.Signer.generatePrivateKey());
    }
    get address() {
        return this.signer.address;
    }
    async sign(data) {
        const signature = this.signer.sign((0, fuels_1.sha256)(data));
        const bytes = Array.from((0, fuels_1.arrayify)(signature));
        return { Secp256k1: { bits: bytes } };
    }
}
exports.FuelSessionSigner = FuelSessionSigner;
//# sourceMappingURL=fuel-signer.js.map