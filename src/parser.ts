import * as fs from "fs";
import { detectFormat } from "./phonemes";

export type Pronunciation = string[];
export type Dict = Map<string, Pronunciation[]>;

export async function loadDictionary(
  path: string
): Promise<{ dict: Dict; format: "arpabet" | "ipa" }> {
  const text = await fs.promises.readFile(path, "utf8");
  const dict: Dict = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith(";;;")) continue;
    const [wordPart, ...phones] = line.trim().split(/\s+/);
    if (phones.length === 0) continue;
    const word = wordPart.toLowerCase();
    const entry = dict.get(word) || [];
    entry.push(phones);
    dict.set(word, entry);
  }
  const firstEntry = dict.values().next().value;
  if (!firstEntry) {
    throw new Error("Dictionary is empty");
  }
  const firstPron = firstEntry[0];
  const fmt = detectFormat(firstPron);
  return { dict, format: fmt };
} 