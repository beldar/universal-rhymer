#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

async function csvToDict(inPath: string, outPath: string): Promise<void> {
  const rl = readline.createInterface({
    input: fs.createReadStream(inPath),
    crlfDelay: Infinity,
  });
  const out = fs.createWriteStream(outPath, { encoding: 'utf8' });
  let isFirst = true;
  for await (const line of rl) {
    const text = line.trim();
    if (!text) continue;
    const fields = text.split(',').map(f => f.trim());
    // Skip header if first column equals 'word'
    if (isFirst && fields[0].toLowerCase() === 'word') {
      isFirst = false;
      continue;
    }
    isFirst = false;
    const word = fields[0];
    let phonemes: string[];
    if (fields.length > 2) {
      phonemes = fields.slice(1);
    } else if (fields.length === 2) {
      // split second column by spaces
      phonemes = fields[1].split(/\s+/);
    } else {
      console.warn(`Skipping invalid line: ${text}`);
      continue;
    }
    out.write(`${word} ${phonemes.join(' ')}\n`);
  }
  out.close();
}

async function main() {
  const [,, inputCsv, outputDict] = process.argv;
  if (!inputCsv || !outputDict) {
    console.error('Usage: ts-node csv2dict.ts <input.csv> <output.dict>');
    process.exit(1);
  }
  const inPath = path.resolve(process.cwd(), inputCsv);
  const outPath = path.resolve(process.cwd(), outputDict);
  await csvToDict(inPath, outPath);
  console.log(`Wrote dictionary to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 