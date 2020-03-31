/*
 * @Author: wangming
 * @Date: 2020-03-19 10:23:36
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-31 15:41:36
 * @Description: file content
 */
const qs = require('qs');
const fs = require('fs-extra');
const fg = require('fast-glob');
const path = require('path');
const merge = require('webpack-merge');
const ROOTPATH = path.resolve('src');
const chalk = require('chalk');
module.exports = function createPages(temPath = 'tempages.json') {
  var templateData = {},
    subPackages = [];
  try {
    templateData = resolveJsData(
      fs.readFileSync(path.join(ROOTPATH, temPath), 'utf-8')
    );
  } catch (error) {
    console.log(chalk.blue('未添加模版或模版格式不正确'));
  }
  var nData = merge(
    {
      pages: [],
      subPackages: [],
      condition: {
        current: 0,
        list: []
      }
    },
    templateData
  );
  const pagePaths = fg.sync(
    ['{pages,sub_*}/**/*.vue', '!**/{components,__*__}/**'],
    {
      cwd: ROOTPATH,
      onlyFiles: true
    }
  );
  pagePaths.forEach(i => {
    var data = fs.readFileSync(path.join(ROOTPATH, i), 'utf-8');
    let reg = /<page-meta>([\s\S]+)<\/page-meta>/;
    let content = data.match(reg);
    let npath = i.replace(/\.vue$/, '');
    var style = {};
    if (!!content) {
      try {
        style = resolveJsData(content[1]);
      } catch (error) {
        console.log(chalk.blue(`${path.join(ROOTPATH, i)}配置不是一个对象`));
      }
      if (!!style.condition) {
        let conditionList = Array.isArray(condition) ? condition : [condition];
        delete style.condition;
        conditionList.forEach(i => {
          let query =
            typeof i.query === 'object' ? qs.stringify(i.query) : i.query;
          nData.condition.list.push({ name: i.name, path: npath, query });
        });
      }
    }
    if (/^pages/.test(i)) {
      if (style._home) {
        delete style._home;
        nData.pages.unshift({ style, path: npath });
      } else {
        nData.pages.push({ style, path: npath });
      }
    } else {
      let pathArr = npath.split('/');
      let rootobj = {
        root: pathArr.splice(0, 1) + '',
        style,
        path: pathArr.join('/')
      };
      subPackages.push(rootobj);
    }
  });
  let obj = subPackages.reduce((curr, page) => {
    let root = page.root;
    if (!!curr[root]) {
      curr[root].push(page);
    } else {
      curr[root] = [page];
    }
    return curr;
  }, {});
  nData.subPackages = Object.values(obj).map(i => {
    let pages = i.map(({ style, path }) => ({ style, path }));
    return { root: i[0].root, pages };
  });
  return JSON.stringify(nData);
};

function resolveJsData(code) {
  return new Function(`return ${code.trim()}`)();
}
