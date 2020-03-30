<!--
 * @Author: wangming
 * @Date: 2020-03-27 14:56:03
 * @LastEditors: wangming
 * @LastEditTime: 2020-03-30 09:50:02
 * @Description: file content
 -->

# uni-auto-pages

uni-app 开发中根据规则自动配置页面 pages，分包 subPackages,和 condition 生成 pages.josn 的 webpack 插件，使得开发者不需要手动的去维护 pages.json。类似 vue-auto-routing,使用非常简单。

## 安装

> npm install uni-auto-pages

首先通过 vue-cli 创建 uni-app 项目 vue.config.js 配置

##### \*注：tempages.json 参数是模版文件名 必须在 src 下，文件名可以自定义

```javascript
const UniAutoPagesPlugin = require('uni-auto-pages');
module.exports = {
  configureWebpack: {
    plugins: [new UniAutoPagesPlugin('tempages.json')]
  }
};
```

> tempages.json 是你的模版文件里面设置一些除了 subPackages，condition,pages 以外的配置 会写入 pages.json 中

可以在模版文件中配置 condition.current 决定当前激活的模式，list 节点的索引值

```javascript
"condition": { "current": 0}
```

> 启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

## 使用说明

##### \*注：所有的分包外层的文件夹必须 sub\_\*\*\*命名。 components 和\_\_\*\_\_ 的文件夹会被忽略

#### page 页面 通过<page-meta>标签放在页面顶层配置 style 参数

```javascript

<page-meta>
 {
  "enablePullDownRefresh": true,
  "navigationBarTextStyle": "black",
  "navigationStyle": "custom"
 }
 </page-meta>
```

开发模式激活改页面配置 关键字 condition 参数即可 query 配置开发页面参数

```javascript
<page-meta>
 {
  "enablePullDownRefresh": true,
  "navigationBarTextStyle": "black",
  "navigationStyle": "custom",
   condition:{name:'首页',query:{}}
 }
 </page-meta>
```

#### 设置应用入口页（即首页）

> 通过在<page-meta> 标签内配置关键字 startHome:true 确定入口页,如果未配置或者配置多个则根据目录顺序决定

```javascript
<page-meta>
 {
   startHome:true,
  "enablePullDownRefresh": true,
  "navigationBarTextStyle": "black",
  "navigationStyle": "custom",
   condition:{name:'首页',query:{}}
 }
 </page-meta>
```

## page 模版参考

```javascript
{
  "pages": [], //可忽略
  "subPackages": [], //可忽略
  "tabBar": {
    "color": "#C6CBD9",
    "selectedColor": "#8974F9",
    "backgroundColor": "#ffffff",
    "iconWidth": "20px",
    "height": "55px",
    "borderStyle": "white",
    "list": [
      {
        "pagePath": "pages/home/index",
        "text": "首页的",
        "iconPath": "static/image/home.png",
        "selectedIconPath": "static/image/home1.png"
      },
      {
        "pagePath": "pages/home/distributor",
        "text": "商城",
        "iconPath": "static/image/agent.png",
        "selectedIconPath": "static/image/agent1.png"
      },
      {
        "pagePath": "pages/home/usercenter",
        "text": "我的",
        "iconPath": "static/image/user.png",
        "selectedIconPath": "static/image/user1.png"
      }
    ]
  },
  "globalStyle": {},
  "condition": {
    "current": 5, //可配置开发的激活索引
    "list": [] //可忽略
  }
}
```

## 开发目录

```

├─ src
| ├─ pages.json
| ├─ tempages.json
| ├─ sub_manage
|    └─pages
|      └─manage
|        ├─ components
|        └─index.vue
| ├─ pages
| |  ├─ home
|       ├─ components
| |  |  └─index,vue
| |  └─ login
| |     └─index.vue
| ├─ static
| ├─ main.js
| ├─ App.vue
| ├─ manifest.json
├─ vue.config.js
└─ package.json
```
