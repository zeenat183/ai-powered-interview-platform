import { Observable } from 'rxjs';
import { MappedTestCaseResult } from './submission.interface';
export declare class CoreSubmissionService {
    mapTestCaseResults({ exampleTestCases, hiddenTestCases, stdout, }: Readonly<{
        exampleTestCases: {
            input: string;
            output: string;
        }[];
        hiddenTestCases: {
            input: string;
            output: string;
        }[];
        stdout: string;
    }>): MappedTestCaseResult[];
    wrapCode(userCode: string, language: string, template: string, exampleTestCases: {
        input: string;
        output: string;
    }[], hiddenTestCases: {
        input: string;
        output: string;
    }[]): Observable<string>;
}
