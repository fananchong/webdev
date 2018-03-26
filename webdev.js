(function () {
    'use strict';

    var express = require('express');
    var http = require('http');
    var W2T = require('websocket2tcpsocket');
    var opn = require('opn');
    var gulp = require('gulp');
    var gulpWebpack = require('webpack-stream');
    var gulpConnect = require('gulp-connect');

    module.exports = webdevjs;

    function webdevjs() { }

    webdevjs.start = function (configfile) {
        if (!configfile) {
            configfile = './webpack.config.js';
        }
        configfile = process.cwd() + '/' + configfile;
        var config = require(configfile);
        gulp.task('html', function () {
            gulp.src(config.devServer.watch_html)
                .pipe(gulp.dest('.'))
                .pipe(gulpConnect.reload());
        });
        gulp.task('webpack', function () {
            gulpWebpack(require(configfile))
                .pipe(gulp.dest('.'))
                .pipe(gulpConnect.reload());
        });
        gulp.task('default', function () {
            webdevjs.runweb(config);
            gulpConnect.server({
                livereload: true,
                port: config.devServer.port,
            });
            gulp.watch(config.devServer.watch_html, ['html']);
            gulp.watch(config.devServer.watch_js, ['webpack']);
        });
        gulp.start();
    };

    webdevjs.runweb = function (config) {
        var app = express();
        if (!!config.output.publicPath) {
            app.use('/', express.static(config.output.publicPath + '/'));
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