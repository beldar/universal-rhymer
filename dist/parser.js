"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDictionary = loadDictionary;
const fs = __importStar(require("fs"));
const phonemes_1 = require("./phonemes");
async function loadDictionary(path) {
    const text = await fs.promises.readFile(path, "utf8");
    const dict = new Map();
    for (const line of text.split(/\r?\n/)) {
        if (!line || line.startsWith(";;;"))
            continue;
        const [wordPart, ...phones] = line.trim().split(/\s+/);
        if (phones.length === 0)
            continue;
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
    const fmt = (0, phonemes_1.detectFormat)(firstPron);
    return { dict, format: fmt };
}
