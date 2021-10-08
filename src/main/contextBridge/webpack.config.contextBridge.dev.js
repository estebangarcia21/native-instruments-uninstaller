const path = require('path');

const entry = path.join(__dirname, 'libs/index.ts');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'libs.js',
    library: {
      name: 'NIFilesystemManagement',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.contextBridge.json',
            onlyCompileBundledFiles: true,
          },
        },
      },
    ],
  },
};
