"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = to;
async function to(promise) {
    try {
        const result = await promise;
        return [null, result];
    }
    catch (err) {
        return [err, null];
    }
}
//# sourceMappingURL=to.utils.js.map