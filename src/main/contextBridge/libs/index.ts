import fs from 'fs';
import path from 'path';
import tsConfig from '../tsconfig.contextBridge.json';
import webpackPaths from '../webpack.paths.contextBridge';

function stripFileEnding(fileName: string | undefined) {
  return fileName && fileName.replace(/\.[^/.]+$/, '');
}

const libPath = path.resolve(__dirname, '..', tsConfig.compilerOptions.baseUrl);

const exporterFileName = stripFileEnding(webpackPaths.exporter);

export default fs
  .readdirSync(libPath)
  .map((f) => stripFileEnding(f))
  .filter((f) => f !== exporterFileName)
  .map((f) => require(`./${f}`).default);
