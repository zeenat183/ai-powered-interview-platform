"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let CoreSubmissionService = class CoreSubmissionService {
    mapTestCaseResults({ exampleTestCases, hiddenTestCases, stdout, }) {
        const allCases = [
            ...exampleTestCases.map((tc) => ({ ...tc, type: 'example' })),
            ...hiddenTestCases.map((tc) => ({ ...tc, type: 'hidden' })),
        ];
        const outputLines = stdout.trim().split('\n');
        return allCases.map((testCase, index) => ({
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: outputLines[index] ?? '',
            type: testCase.type,
        }));
    }
    wrapCode(userCode, language, template, exampleTestCases, hiddenTestCases) {
        return (0, rxjs_1.from)([exampleTestCases.concat(hiddenTestCases)]).pipe((0, rxjs_1.map)((allCases) => {
            const formatted = allCases.map(tc => {
                const args = tc.input.trim().split(/\s+/).join(', ');
                return language === 'cpp' || language === 'java'
                    ? `{${args}}`
                    : `[${args}]`;
            });
            const inputArrayStr = language === 'cpp' || language === 'java'
                ? `{${formatted.join(', ')}}`
                : `[${formatted.join(', ')}]`;
            console.log('----userCode---', userCode.trim());
            const codeWithInputs = template.replace('{{INPUT_ARRAY}}', inputArrayStr);
            const finalCode = codeWithInputs.replace('// your code here', userCode.trim());
            return finalCode;
        }));
    }
};
exports.CoreSubmissionService = CoreSubmissionService;
exports.CoreSubmissionService = CoreSubmissionService = __decorate([
    (0, common_1.Injectable)()
], CoreSubmissionService);
//# sourceMappingURL=submission.service.js.map