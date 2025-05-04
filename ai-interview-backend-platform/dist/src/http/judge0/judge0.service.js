"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Judge0Service = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const judge0_error_1 = require("./judge0.error");
let Judge0Service = class Judge0Service {
    http;
    configService;
    baseUrl = 'https://judge0-ce.p.rapidapi.com';
    constructor(http, configService) {
        this.http = http;
        this.configService = configService;
    }
    async submitCode(source_code, language_id, stdin = '') {
        const apiKey = this.configService.get('JUDGE0_API_KEY');
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
        };
        const body = {
            source_code,
            language_id,
            stdin,
        };
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.post(`${this.baseUrl}/submissions?base64_encoded=false&wait=true`, body, options));
            return response.data;
        }
        catch (err) {
            throw new judge0_error_1.Judge0SubmissionError(err.message);
        }
    }
};
exports.Judge0Service = Judge0Service;
exports.Judge0Service = Judge0Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], Judge0Service);
//# sourceMappingURL=judge0.service.js.map