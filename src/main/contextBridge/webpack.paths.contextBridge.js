const path = require('path');

const outDir = 'dist';

if (__dirname.split('/').pop() === outDir) {
  __dirname = path.resolve(__dirname, '..');
}

module.exports = {
  outDir: path.join(__dirname, outDir),
  libsDir: path.join(__dirname, 'libs'),
  libsExporter: path.join(__dirname, 'libs/index.ts')
};
