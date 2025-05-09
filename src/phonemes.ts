export const ARPABET_VOWELS = new Set([
  "AA","AE","AH","AO","AW","AY",
  "EH","ER","EY","IH","IY","OW","OY","UH","UW"
]);

export const IPA_VOWEL_REGEX = /[aeiouɑəɛɪɔʊ]/i;

/** returns 'arpabet' | 'ipa' */
export function detectFormat(tokens: string[]): "arpabet" | "ipa" {
  // ARPABET tokens are uppercase and may end in a stress digit
  if (tokens.some(t => /^[A-Z]+[012]$/.test(t))) return "arpabet";
  // Otherwise assume IPA
  return "ipa";
} 