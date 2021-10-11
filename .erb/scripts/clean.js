const rimraf = require('rimraf');
const process = require('process');
const webpackPaths = require('../configs/webpack.paths.js');

const args = process.argv.slice(2);
const commandMap = {
  dist: webpackPaths.releasePath,
  release: webpackPaths.distPath,
  dll: webpackPaths.dllPath
};

args.forEach((x) => {
  const pathToRemove = commandMap[x];
  if (pathToRemove !== undefined) {
    rimraf.sync(pathToRemove);
  }
});
