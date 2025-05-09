export type Pronunciation = string[];
export type Dict = Map<string, Pronunciation[]>;
export declare function loadDictionary(path: string): Promise<{
    dict: Dict;
    format: "arpabet" | "ipa";
}>;
