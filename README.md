<!--
 * @Author: wangming
 * @Date: 2020-03-27 14:56:03
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-27 16:10:41
 * @Description: file content
 -->

# uni-auto-pages

> uni-app 开发中 根据规则 自动配置页面 pages，分包 subPackages,和 condition 生成 pages.josn，类似 vue-auto-routing

#### 安装

> npm install uni-auto-pages

###### vie.config.js tempages.json 是你的模版文件里面设置一些除了 subPackages，condition,pages 以外的配置 会写入 pages.json 中

```javascript
const UniAutoPagesPlugin = require('uni-auto-pages');
module.exports = {
  configureWebpack: {
    plugins: [new UniAutoPagesPlugin('tempages.json')]
  }
};
```

###### 使用说明

> 所有的分包外层的文件夹必须 sub\_\*\*\*命名。
