#!/usr/bin/env ts-node

import * as path from 'path';
import { initDictionary } from './src/index';

async function main() {
  const [,, dictArg, wordArg] = process.argv;
  if (!dictArg) {
    console.error('Usage: ts-node demo.ts <path/to/dictionary> [word]');
    process.exit(1);
  }
  const dictPath = path.resolve(process.cwd(), dictArg);
  console.log(`Loading dictionary from ${dictPath}...`);

  const { countSyllables, findRhyme, findRhymesBySyllable } = await initDictionary(dictPath);

  const word = wordArg || 'time';
  console.log(`\nWord: ${word}`);
  console.log(`Syllables: ${countSyllables(word)}`);

  const rhymes = findRhyme(word);
  console.log(`Rhymes: ${rhymes.join(', ')}`);

  // Also group rhymes by syllable count
  const grouped = findRhymesBySyllable(word);
  console.log(`\nRhymes by syllable count:`);
  Object.keys(grouped)
    .map(k => Number(k))
    .sort((a, b) => a - b)
    .forEach(count => {
      console.log(`  ${count}: ${grouped[count].join(', ')}`);
    });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 