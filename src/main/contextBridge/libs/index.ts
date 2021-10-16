import fs from 'fs';
import webpackPaths from '../webpack.paths.contextBridge';

function stripFileEnding(fileName?: string) {
  return fileName?.replace(/\.[^/.]+$/, '');
}

const exporterFileName = stripFileEnding(
  webpackPaths.libsExporter.split('/').pop()
);

export default fs
  .readdirSync(webpackPaths.libsDir)
  .map((f) => stripFileEnding(f))
  .filter((f) => f !== exporterFileName)
  .map((f) => require(`./${f}/index`).default);
