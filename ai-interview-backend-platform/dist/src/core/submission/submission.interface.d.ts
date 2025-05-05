export interface MappedTestCaseResult {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    type: 'example' | 'hidden';
}
