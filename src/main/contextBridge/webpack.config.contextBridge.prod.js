const { merge } = require('webpack-merge');
const chalk = require('chalk');
const baseConfig = require('./webpack.config.contextBridge.base');

console.log(chalk.blueBright.bold('Bundling context libraries for production'));

module.exports = merge(baseConfig, {
  mode: 'production'
});
