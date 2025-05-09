"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDictionary = initDictionary;
const parser_1 = require("./parser");
const rhyme_1 = require("./rhyme");
async function initDictionary(path) {
    const { dict, format } = await (0, parser_1.loadDictionary)(path);
    return {
        countSyllables: (w) => (0, rhyme_1.countSyllables)(dict, w, format),
        findRhyme: (w) => (0, rhyme_1.findRhyme)(dict, w, format)
    };
}
