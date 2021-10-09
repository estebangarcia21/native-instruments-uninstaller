import fs from 'fs';
import path from 'path';
import tsConfig from '../tsconfig.contextBridge.json';

function stripFileEnding(fileName: string | undefined) {
  return fileName && fileName.replace(/\.[^/.]+$/, '');
}

const libPath = path.resolve(__dirname, '..', tsConfig.compilerOptions.baseUrl);

const entryFile = stripFileEnding(require('../entry'));

export default fs
  .readdirSync(libPath)
  .map((f) => stripFileEnding(f))
  .filter((f) => f !== entryFile)
  .map((f) => require(`./${f}`).default);
