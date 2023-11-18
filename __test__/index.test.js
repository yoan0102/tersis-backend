"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const request = (0, supertest_1.default)(app_1.default);
(0, vitest_1.describe)('http', () => {
    (0, vitest_1.it)('tracks', () => {
        // request.get()
        (0, vitest_1.expect)(4).toBe(4);
    });
});
//# sourceMappingURL=index.test.js.map