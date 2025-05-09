import { ARPABET_VOWELS, IPA_VOWEL_REGEX } from "./phonemes";
import { Dict, Pronunciation } from "./parser";

/** count syllables in one pronunciation */
export function countInPron(
  pr: Pronunciation,
  format: "arpabet" | "ipa"
): number {
  if (format === "arpabet") {
    return pr.filter(p => ARPABET_VOWELS.has(p.replace(/[012]$/, ""))).length;
  } else {
    return pr.reduce((sum, tok) => sum + (IPA_VOWEL_REGEX.test(tok) ? 1 : 0), 0);
  }
}

/** extract rhyme part from last vowel to end */
export function rhymeKey(
  pr: Pronunciation,
  format: "arpabet" | "ipa"
): string {
  const isVowel = format === "arpabet"
    ? (tok: string) => ARPABET_VOWELS.has(tok.replace(/[012]$/, ""))
    : (tok: string) => IPA_VOWEL_REGEX.test(tok);
  const idx = pr.map(isVowel).lastIndexOf(true);
  return idx >= 0 ? pr.slice(idx).join(" ") : pr.join(" ");
}

/** count syllables for a word using the first pronunciation */
export function countSyllables(
  dict: Dict,
  word: string,
  format: "arpabet" | "ipa"
): number {
  const entry = dict.get(word.toLowerCase());
  if (!entry) {
    throw new Error(`"${word}" not in dictionary`);
  }
  return countInPron(entry[0], format);
}

/** find all words that rhyme with the given word */
export function findRhyme(
  dict: Dict,
  word: string,
  format: "arpabet" | "ipa"
): string[] {
  const prons = dict.get(word.toLowerCase());
  if (!prons) {
    throw new Error(`"${word}" not in dictionary`);
  }
  const keys = new Set(prons.map(pr => rhymeKey(pr, format)));
  const out = new Set<string>();
  for (const [w, prList] of dict.entries()) {
    if (w === word.toLowerCase()) continue;
    for (const pr of prList) {
      if (keys.has(rhymeKey(pr, format))) {
        out.add(w);
      }
    }
  }
  return Array.from(out);
}

/**
 * Find rhymes for a word, grouped by syllable count
 */
export function findRhymesBySyllable(
  dict: Dict,
  word: string,
  format: "arpabet" | "ipa"
): Record<number, string[]> {
  const rhymes = findRhyme(dict, word, format);
  const grouped: Record<number, string[]> = {};
  for (const w of rhymes) {
    const syllables = countSyllables(dict, w, format);
    if (!grouped[syllables]) {
      grouped[syllables] = [];
    }
    grouped[syllables].push(w);
  }
  return grouped;
} 