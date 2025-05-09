import { loadDictionary, Dict } from "./parser";
import { countSyllables as countFn, findRhyme as rhymeFn, findRhymesBySyllable as groupBySyllableFn } from "./rhyme";

export async function initDictionary(
  path: string
): Promise<{
  countSyllables(word: string): number;
  findRhyme(word: string): string[];
  findRhymesBySyllable(word: string): Record<number, string[]>;
}> {
  const { dict, format } = await loadDictionary(path);
  return {
    countSyllables: (w: string) => countFn(dict, w, format),
    findRhyme: (w: string) => rhymeFn(dict, w, format),
    findRhymesBySyllable: (w: string) => groupBySyllableFn(dict, w, format)
  };
} 