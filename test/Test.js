import fs from "fs";
import path from 'path';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import LZW from "../backend/lib/LZW.js";

const FileExtension = 'gif';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let inputFile = resolve(__dirname, `./TestFile.${FileExtension}`);
let outputFile = resolve(__dirname, `./compressed.${FileExtension}.lzw`);
let doneFile = resolve(__dirname, `./decompressed.${FileExtension}`);

let compressed = LZW.compress(fs.readFileSync(inputFile, 'binary'));
fs.writeFileSync(outputFile, compressed, 'ucs2');

let decompressed = LZW.decompress(fs.readFileSync(outputFile, 'ucs2'));
fs.writeFileSync(doneFile, decompressed, 'binary');;