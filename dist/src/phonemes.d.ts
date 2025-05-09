export declare const ARPABET_VOWELS: Set<string>;
export declare const IPA_VOWEL_REGEX: RegExp;
/** returns 'arpabet' | 'ipa' */
export declare function detectFormat(tokens: string[]): "arpabet" | "ipa";
