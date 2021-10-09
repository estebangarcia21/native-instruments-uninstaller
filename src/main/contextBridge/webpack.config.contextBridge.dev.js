const { merge } = require('webpack-merge');
const chalk = require('chalk');
const baseConfig = require('./webpack.config.contextBridge.base');

console.log(
  chalk.blueBright.bold('Watching for changes to the context libraries')
);

module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true,
});
