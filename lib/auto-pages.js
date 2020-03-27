/*
 * @Author: wangming
 * @Date: 2020-03-19 10:23:36
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-27 14:47:38
 * @Description: file content
 */
const qs = require("qs");
const fs = require("fs-extra");
const fg = require("fast-glob");
const path = require("path");
const merge = require("webpack-merge");
const ROOTPATH = path.resolve("src");
const chalk = require("chalk");
const templateData = {};
module.exports = function createPages(temPath = "tempages.json") {
  try {
    templateData = resolveJsData(
      fs.readFileSync(path.join(ROOTPATH, temPath), "utf-8")
    );
  } catch (error) {
    console.log(chalk.blue("未添加模版或模版格式不正确"));
  }
  const subPackages = [];
  const nData = merge(
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
    ["{pages,sub_*}/**/*.vue", "!**/{components,__*__}/**"],
    {
      cwd: ROOTPATH,
      onlyFiles: true
    }
  );
  pagePaths.forEach(i => {
    var data = fs.readFileSync(path.join(ROOTPATH, i), "utf-8");
    let reg = /<page-meta>([\s\S]+)<\/page-meta>/;
    let content = data.match(reg);
    let npath = i.replace(/\.vue$/, "");
    var style = {};
    if (!!content) {
      try {
        style = resolveJsData(content[1]);
      } catch (error) {
        console.log(chalk.blue(`${path.join(ROOTPATH, i)}配置不是一个对象`));
      }
      if (!!style.condition) {
        let { name, query } = style.condition;
        let path = !!qs.stringify(query)
          ? npath + "?" + qs.stringify(query)
          : npath;
        nData.condition.list.push({ name, path });
        delete style.condition;
      }
    }
    if (/^pages/.test(i)) {
      nData.pages.push({ style, path: npath });
    } else {
      let pathArr = npath.split("/");
      let rootobj = {
        root: pathArr.splice(0, 1) + "",
        style,
        path: pathArr.join("/")
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
