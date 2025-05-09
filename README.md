# universal-rhymer

A Node.js library to find rhymes and count syllables from a CMU-style phoneme dictionary in ARPABET or IPA formats.

## Installation

Install from npm:

```bash
npm install universal-rhymer
```

## Usage

Use the library in your TypeScript or JavaScript project:

```ts
import { initDictionary } from "universal-rhymer";

async function demo() {
  const { countSyllables, findRhyme, findRhymesBySyllable } =
    await initDictionary("path/to/dict.txt");

  // Count syllables
  console.log(countSyllables("time"));
  // => 1

  // Find flat list of rhymes
  console.log(findRhyme("time"));
  // => ["rhyme", "lime", ...]

  // Find rhymes grouped by syllable count
  console.log(findRhymesBySyllable("time"));
  // => { 1: ["rhyme", "lime"], ... }
}

demo();
```

## CLI Demo

A simple command-line demo is included in `demo.ts`. Run it with:

```bash
npm run demo -- path/to/dictionary [word]
```

- `path/to/dictionary`: path to your ARPABET or IPA dictionary file
- `[word]`: optional word to analyze (defaults to `time`)

## CSV Conversion

Convert a CSV-based dictionary into the CMU/IPA format using `csv2dict.ts`:

- If your CSV has a header row starting with `word`, it will be skipped.
- **Multiple phoneme columns**:
  ```csv
  word,phoneme1,phoneme2,phoneme3
  time,T,AY,M
  ```
- **Single-quoted phoneme string**:
  ```csv
  word,phonemes
  time,"T AY M"
  ```

Run the converter:

```bash
npm run csv2dict -- input.csv output.dict
```

The `output.dict` file can then be used directly:

```bash
npm run demo -- output.dict [word]
```

## API Reference

```ts
async function initDictionary(
  path: string
): Promise<{
  /** Count syllables of a word using the first pronunciation */
  countSyllables(word: string): number;

  /** Find an array of words that rhyme with the input word */
  findRhyme(word: string): string[];

  /**
   * Find rhymes grouped by their syllable count.
   * Returns a mapping: syllableCount -> array of rhyming words
   */
  findRhymesBySyllable(word: string): Record<number, string[]>;
}>;
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or pull request.

## License

MIT