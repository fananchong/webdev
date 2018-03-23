var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var http = require('http');
var W2T = require('websocket2tcpsocket');

module.exports = WebDev;

function WebDev() { }

var proto = WebDev.prototype;

proto.start = function (port, publish, configfile) {
    var app = express();
    if (!publish) {
        publish = '.';
    }
    if (!configfile) {
        configfile = './webpack.config.js';
    }
    var config = require(process.cwd() + '/'+ configfile);
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: publish,
        hot: true,
        inline: true
    }));
    app.use('/', express.static(publish));
    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });
    var server = http.createServer(app);
    var w2t = new W2T();
    w2t.start({ server: server });
    server.listen(port, function () {
        console.log("listen 0.0.0.0:%d", port);
    });
};
