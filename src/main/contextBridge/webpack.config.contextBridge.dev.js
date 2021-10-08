const { merge } = require('webpack-merge');
const chalk = require('chalk');
const baseConfig = require('./webpack.config.contextBridge.base');

console.log(
  chalk.red.bold('Listening for changes to the contextBridge libraries')
);

module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true
});
