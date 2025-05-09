import * as path from 'path';
import { initDictionary } from '../src/index';

describe('universal-rhymer ARPABET', () => {
  let countSyllables: (w: string) => number;
  let findRhyme: (w: string) => string[];
  let findRhymesBySyllable: (w: string) => Record<number, string[]>;

  beforeAll(async () => {
    const dictPath = path.resolve(__dirname, 'fixtures', 'cmu_test.dict');
    const init = await initDictionary(dictPath);
    countSyllables = init.countSyllables;
    findRhyme = init.findRhyme;
    findRhymesBySyllable = init.findRhymesBySyllable;
  });

  test('countSyllables should count ARPABET syllables', () => {
    expect(countSyllables('time')).toBe(1);
    expect(countSyllables('computer')).toBe(3);
  });

  test('findRhyme should find rhymes in ARPABET', () => {
    const rhymes = findRhyme('time').sort();
    expect(rhymes).toEqual(['lime', 'rhyme']);
  });

  test('findRhymesBySyllable should group ARPABET rhymes by syllable count', () => {
    const grouped = findRhymesBySyllable('time');
    expect(Object.keys(grouped)).toEqual(['1']);
    expect(grouped[1].sort()).toEqual(['lime', 'rhyme']);
  });
});

describe('universal-rhymer IPA', () => {
  let countSyllables: (w: string) => number;
  let findRhyme: (w: string) => string[];
  let findRhymesBySyllable: (w: string) => Record<number, string[]>;

  beforeAll(async () => {
    const dictPath = path.resolve(__dirname, 'fixtures', 'ipa_test.dict');
    const init = await initDictionary(dictPath);
    countSyllables = init.countSyllables;
    findRhyme = init.findRhyme;
    findRhymesBySyllable = init.findRhymesBySyllable;
  });

  test('countSyllables should count IPA syllables', () => {
    expect(countSyllables('time')).toBe(1);
  });

  test('findRhyme should find rhymes in IPA', () => {
    const rhymes = findRhyme('time').sort();
    expect(rhymes).toEqual(['lime', 'rhyme']);
  });

  test('findRhymesBySyllable should group IPA rhymes by syllable count', () => {
    const grouped = findRhymesBySyllable('time');
    expect(Object.keys(grouped)).toEqual(['1']);
    expect(grouped[1].sort()).toEqual(['lime', 'rhyme']);
  });
}); 