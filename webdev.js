var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var http = require('http');
var W2T = require('websocket2tcpsocket');
var opn = require('opn');

module.exports = WebDev;

function WebDev() { }

var proto = WebDev.prototype;

proto.start = function (configfile) {
    var app = express();
    if (!configfile) {
        configfile = './webpack.config.js';
    }
    var config = require(process.cwd() + '/' + configfile);
    if (!!config.devServer.wwwPath) {
        app.use('/', express.static(config.devServer.wwwPath + '/'));
    }
    else {
        app.use('/', express.static('./'));
    }

    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });

    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        logLevel: 'warn',
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));
    var server = http.createServer(app);
    var w2t = new W2T();
    w2t.start({ server: server });


    var temp = config.output.publicPath.split(":");
    var port = temp[temp.length - 1].split('/')[0];

    console.log('port =', port);

    server.listen(parseInt(port), function () {
        console.log("listen 0.0.0.0:%s", port);
        if (!!config.devServer.open) {
            if (!!config.devServer.browser) {
                opn('http://localhost:' + port, { app: config.devServer.browser });
            } else {
                opn('http://localhost:' + port);
            }
        }
    });
};
