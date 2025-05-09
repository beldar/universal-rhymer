import { Dict, Pronunciation } from "./parser";
/** count syllables in one pronunciation */
export declare function countInPron(pr: Pronunciation, format: "arpabet" | "ipa"): number;
/** extract rhyme part from last vowel to end */
export declare function rhymeKey(pr: Pronunciation, format: "arpabet" | "ipa"): string;
/** count syllables for a word using the first pronunciation */
export declare function countSyllables(dict: Dict, word: string, format: "arpabet" | "ipa"): number;
/** find all words that rhyme with the given word */
export declare function findRhyme(dict: Dict, word: string, format: "arpabet" | "ipa"): string[];
