import fs from 'fs';
import path from 'path';
import tsConfig from '../tsconfig.contextBridge.json';

function stripFileEnding(fileName?: string) {
  return fileName?.replace(/\.[^/.]+$/, '');
}

const libPath = path.resolve(__dirname, '..', tsConfig.compilerOptions.baseUrl);

export default fs
  .readdirSync(libPath)
  .map((f) => stripFileEnding(f))
  .filter((f) => f !== 'index')
  .map((f) => require(`./${f}`).default);
