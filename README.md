# webdev

集成web服务、调试、tcp代理功能的通用web服务器。

## 安装

```dos
npm install webdevjs --save-dev
```

## 例子

在example目录中。

主要请参考：[web.config.js](example/webpack.config.js)

## 编写目的

做H5游戏开发时，通常需要提供以下措施：

- 开tomcat、nginx、apache之类的web服务器，提供网址
- 使用gulp、webpack-dev-server之类的热更调试服务器
- websocket到tcp服务器的代理。方便网页直接访问tcp服务器
- 解决浏览器跨域问题（根源上解决是需要服务器提供Get方法）

以上都可以集成到一起。正是`webdev`要做的。

`webdev`将使用node.js集成以下项目：

- express
- gulp
- gulp-webpack
- websocket2tcpsocket
