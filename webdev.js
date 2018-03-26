(function () {
    'use strict';

    var express = require('express');
    var http = require('http');
    var W2T = require('websocket2tcpsocket');
    var opn = require('opn');
    var gulp = require('gulp');
    var gulpWebpack = require('webpack-stream');
    var connect = require('gulp-connect');

    module.exports = webdevjs;

    function webdevjs() { }

    webdevjs.start = function (configfile) {
        if (!!configfile) {
            configfile = './webpack.config.js';
        }
        configfile = process.cwd() + '/' + configfile;
        var config = require(configfile);
        gulp.task('webpack', function () {
            gulpWebpack(require(configfile))
                .pipe(gulp.dest('.'));
        });
        gulp.task('default', function () {
            gulp.watch(config.devServer.watch, ['webpack']);
        });

        webdevjs.runweb(config);
        gulp.start();
    };

    webdevjs.runweb = function (config) {
        var app = express();
        if (!!config.devServer.wwwPath) {
            app.use('/', express.static(config.devServer.wwwPath + '/'));
        }
        else {
            app.use('/', express.static('./'));
        }

        app.get('/', function (req, res) {
            res.sendFile(__dirname + "/index.html");
        });

        var server = http.createServer(app);
        var w2t = new W2T();
        w2t.start({ server: server });

        var port = config.devServer.port;
        server.listen(port, function () {
            console.log("listen 0.0.0.0:%d", port);
            if (!!config.devServer.open) {
                if (!!config.devServer.browser) {
                    opn('http://localhost:' + String(port), { app: config.devServer.browser });
                } else {
                    opn('http://localhost:' + String(port));
                }
            }
        });
    };

})();