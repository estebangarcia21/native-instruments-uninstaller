const path = require('path');
const webpackPaths = require('./webpack.paths.contextBridge');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const tsconfig = 'tsconfig.contextBridge.json';

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
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, tsconfig)
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsconfig
            }
          }
        ]
      }
    ]
  }
};
