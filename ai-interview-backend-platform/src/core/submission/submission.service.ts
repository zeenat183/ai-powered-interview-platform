import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { MappedTestCaseResult } from './submission.interface';

@Injectable()
export class CoreSubmissionService {

    mapTestCaseResults({
        exampleTestCases,
        hiddenTestCases,
        stdout,
      }: Readonly<{
        exampleTestCases: { input: string; output: string }[];
        hiddenTestCases: { input: string; output: string }[];
        stdout: string;
      }>): MappedTestCaseResult[] {
        const allCases = [
          ...exampleTestCases.map((tc) => ({ ...tc, type: 'example' as const })),
          ...hiddenTestCases.map((tc) => ({ ...tc, type: 'hidden' as const })),
        ];
      
        const outputLines = stdout.trim().split('\n');
      
        return allCases.map((testCase, index) => ({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: outputLines[index] ?? '',
          type: testCase.type,
        }));
      }

      
  wrapCode(
    userCode: string,
    language: string,
    template: string,
    exampleTestCases: { input: string; output: string }[],
    hiddenTestCases: { input: string; output: string }[],
  ): Observable<string> {
    return from([exampleTestCases.concat(hiddenTestCases)]).pipe(
      map((allCases) => {
        // Format input for each test case
        const formatted = allCases.map(tc => {
          const args = tc.input.trim().split(/\s+/).join(', ');
          return language === 'cpp' || language === 'java'
            ? `{${args}}`
            : `[${args}]`;
        });

        // Join and wrap array based on language syntax
        const inputArrayStr = language === 'cpp' || language === 'java'
          ? `{${formatted.join(', ')}}`
          : `[${formatted.join(', ')}]`;
        const codeWithInputs = template.replace('{{INPUT_ARRAY}}', inputArrayStr);
        const finalCode = codeWithInputs.replace('// your code here', userCode.trim());

        return finalCode;
      }),
    );
  }
}
