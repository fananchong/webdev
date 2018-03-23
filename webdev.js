var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var http = require('http');
var W2T = require('websocket2tcpsocket');

module.exports = WebDev;

function WebDev() { }

var proto = WebDev.prototype;

proto.start = function (port, configfile) {
    var app = express();
    if (!configfile) {
        configfile = './webpack.config.js';
    }
    var config = require(process.cwd() + '/' + configfile);
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler,{log  :console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000}));
    var server = http.createServer(app);
    var w2t = new W2T();
    w2t.start({ server: server });
    server.listen(port, function () {
        console.log("listen 0.0.0.0:%d", port);
    });
};
