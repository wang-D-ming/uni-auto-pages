/*
 * @Author: wangming
 * @Date: 2020-03-26 21:56:30
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-31 16:29:19
 * @Description: file content
 */
const chalk = require('chalk');
const autoPages = require('./lib/auto-pages');
const fs = require('fs-extra');
const pluginName = 'UniAutoPagesPlugin';
const path = require('path');
class UniAutoPagesPlugin {
  constructor(temPath) {
    this.temPath = temPath;
  }
  generate() {
    const code = autoPages(this.temPath);
    const to = path.resolve('src/pages.json');
    if (
      fs.existsSync(to) &&
      fs.readFileSync(to, 'utf8').trim() === code.trim()
    ) {
      return;
    }
    fs.writeFileSync(to, code);
    console.log(chalk.green('pages.json生成成功'));
  }
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, this.generate.bind(this));
    compiler.hooks.watchRun.tap(pluginName, this.generate.bind(this));
  }
}
module.exports = UniAutoPagesPlugin;
// new UniAutoPagesPlugin().generate();
