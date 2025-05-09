"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPA_VOWEL_REGEX = exports.ARPABET_VOWELS = void 0;
exports.detectFormat = detectFormat;
exports.ARPABET_VOWELS = new Set([
    "AA", "AE", "AH", "AO", "AW", "AY",
    "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"
]);
exports.IPA_VOWEL_REGEX = /[aeiouɑəɛɪɔʊ]/i;
/** returns 'arpabet' | 'ipa' */
function detectFormat(tokens) {
    // ARPABET tokens are uppercase and may end in a stress digit
    if (tokens.some(t => /^[A-Z]+[012]$/.test(t)))
        return "arpabet";
    // Otherwise assume IPA
    return "ipa";
}
