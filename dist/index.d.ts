export declare function initDictionary(path: string): Promise<{
    countSyllables(word: string): number;
    findRhyme(word: string): string[];
}>;
