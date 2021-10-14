const path = require('path');
const webpackPaths = require('./webpack.paths.contextBridge');

module.exports = {
  target: 'electron-main',
  entry: webpackPaths.libsExporter,
  output: {
    path: webpackPaths.outDir,
    filename: 'libs.js',
    library: {
      name: 'niFilesystemManagement',
      type: 'umd'
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.contextBridge.json'
          }
        }
      }
    ]
  }
};
