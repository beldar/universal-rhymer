"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countInPron = countInPron;
exports.rhymeKey = rhymeKey;
exports.countSyllables = countSyllables;
exports.findRhyme = findRhyme;
const phonemes_1 = require("./phonemes");
/** count syllables in one pronunciation */
function countInPron(pr, format) {
    if (format === "arpabet") {
        return pr.filter(p => phonemes_1.ARPABET_VOWELS.has(p.replace(/[012]$/, ""))).length;
    }
    else {
        return pr.reduce((sum, tok) => sum + (phonemes_1.IPA_VOWEL_REGEX.test(tok) ? 1 : 0), 0);
    }
}
/** extract rhyme part from last vowel to end */
function rhymeKey(pr, format) {
    const isVowel = format === "arpabet"
        ? (tok) => phonemes_1.ARPABET_VOWELS.has(tok.replace(/[012]$/, ""))
        : (tok) => phonemes_1.IPA_VOWEL_REGEX.test(tok);
    const idx = pr.map(isVowel).lastIndexOf(true);
    return idx >= 0 ? pr.slice(idx).join(" ") : pr.join(" ");
}
/** count syllables for a word using the first pronunciation */
function countSyllables(dict, word, format) {
    const entry = dict.get(word.toLowerCase());
    if (!entry) {
        throw new Error(`"${word}" not in dictionary`);
    }
    return countInPron(entry[0], format);
}
/** find all words that rhyme with the given word */
function findRhyme(dict, word, format) {
    const prons = dict.get(word.toLowerCase());
    if (!prons) {
        throw new Error(`"${word}" not in dictionary`);
    }
    const keys = new Set(prons.map(pr => rhymeKey(pr, format)));
    const out = new Set();
    for (const [w, prList] of dict.entries()) {
        if (w === word.toLowerCase())
            continue;
        for (const pr of prList) {
            if (keys.has(rhymeKey(pr, format))) {
                out.add(w);
            }
        }
    }
    return Array.from(out);
}
