const path = require('path');
const webpackPaths = require('./webpack.paths.contextBridge');

module.exports = {
  target: 'electron-main',
  entry: path.join(__dirname, 'libs', webpackPaths.exporter),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'libs.js',
    library: {
      name: 'niFilesystemManagement',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.js', '.ts'],
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
