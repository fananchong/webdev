# webdev

集成web服务、调试、tcp代理功能的通用web服务器。

## 安装

```dos
npm install webdev --save-dev
```

## web.config.js例子

请参考： [web.config.js](example/web.config.js)

## 编写目的

做H5游戏开发时，通常需要提供以下措施：

-   开tomcat、nginx、apache之类的web服务器，提供网址
-   使用gulp、webpack-dev-server之类的热更调试服务器
-   websocket到tcp服务器的代理。方便网页直接访问tcp服务器

以上都可以集成到一起。正是`webdev`要做的。

`webdev`将使用node.js集成以下项目：

-   express
-   webpack-dev-server
-   websocket2tcpsocket

## 热更新参考

-   <https://doc.webpack-china.org/guides/development>
-   <https://doc.webpack-china.org/guides/hot-module-replacement/>
