# 前言

```
$ npm install
```
初始化加载项目依赖模块
```
packjson.json
--host localhost --port 8080   默认
```
配置启动host,post   

```
npm start
npm run build
```
启动本地开发服务
构建生产代码

## 项目结构

```
│  package.json
│  webpack.config.js
│  webpack.build.js
├─src
│      app            对应Tab页面入口，功能，请求接口，数据格式化，逻辑交互层
│      common         复用功能组件
│      component      复用module
│      constants      常量配置        import ... from 'app_constants'
│      router         路由配置
│      index.jsx      打包入口文件
├─resources           资源存储目录
│      css   
│      images         图片   引入     import ... from 'app_images/....png'   
│      js   
│      lib            剥离依赖库   
├─pages
│      index.html     渲染入口

```


## 统一规范

请求接口走 axios
[axios](https://github.com/axios/axios)
```
import axios from 'axios';
require('es6-promise').polyfill();
```
- [x] 注意 引入axios模块时 ，下面引入es6-promise ,处理浏览器兼容


常量配置在constans中

路由自己配置  router.js

node_mouldes 不要提交

页面方法绑定在constructor中
参照↓
```
src/resources/component/baseLayout
```
