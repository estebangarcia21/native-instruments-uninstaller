const path = require('path');

if (__dirname.split('/').pop() === 'dist') {
  __dirname = path.resolve(__dirname, '..');
}

module.exports = {
  outDir: path.join(__dirname, 'dist'),
  libsDir: path.join(__dirname, 'libs'),
  libsExporter: path.join(__dirname, 'libs/index.ts')
};
