<!--
 * @Author: wangming
 * @Date: 2020-03-27 14:56:03
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-27 16:21:57
 * @Description: file content
 -->

# uni-auto-pages

> uni-app 开发中 根据规则 自动配置页面 pages，分包 subPackages,和 condition 生成 pages.josn，类似 vue-auto-routing

#### 安装

> npm install uni-auto-pages

#### vie.config.js 配置

```javascript
const UniAutoPagesPlugin = require('uni-auto-pages');
module.exports = {
  configureWebpack: {
    plugins: [new UniAutoPagesPlugin('tempages.json')]
  }
};
```

> tempages.json 是你的模版文件里面设置一些除了 subPackages，condition,pages 以外的配置 会写入 pages.json 中

#### 可以在模版文件中配置 condition.current 决定当前激活的模式，list 节点的索引值

```javascript
"condition": { "current": 0, "list": [] }
```

> 启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

#### 使用说明

###### #\*注：所有的分包外层的文件夹必须 sub\_\*\*\*命名。

```javascript
//page 页面 配置  style 参数方式
<route-meta>
 {
  "enablePullDownRefresh": true,
  "navigationBarTextStyle": "black",
  "navigationStyle": "custom"
 }
 </route-meta>
```

开发模式激活改页面配置 condition 参数即可 query 配置开发页面参数

```javascript
<route-meta>
 {
  "enablePullDownRefresh": true,
  "navigationBarTextStyle": "black",
  "navigationStyle": "custom"
   condition:{name:'首页',query:{}}
 }
 </route-meta>
```
