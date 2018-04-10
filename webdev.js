(function () {
    'use strict';

    var express = require('express');
    var http = require('http');
    var W2T = require('websocket2tcpsocket');
    var opn = require('opn');
    var gulp = require('gulp');
    var gulpWebpack = require('webpack-stream');
    var gulpConnect = require('gulp-connect');
    var gulpPlumber = require('gulp-plumber');
    var httpProxyMiddleware = require('http-proxy-middleware');

    module.exports = webdevjs;

    function webdevjs() { }

    webdevjs.start = function (configfile) {
        if (!configfile) {
            configfile = './webpack.config.js';
        }
        configfile = process.cwd() + '/' + configfile;
        var config = require(configfile);
        gulp.task('html', function () {
            return gulp.src(config.devServer.watch_html)
                .pipe(gulpPlumber({
                    errorHandler: function (error) {
                        this.emit('end');
                    }
                }))
                .pipe(gulpConnect.reload());
        });
        gulp.task('webpack', function () {
            return gulp.src(config.devServer.watch_js)
                .pipe(gulpPlumber({
                    errorHandler: function (error) {
                        this.emit('end');
                    }
                }))
                .pipe(gulpWebpack(require(configfile)))
                .pipe(gulp.dest('.'))
                .pipe(gulpConnect.reload());
        });
        gulp.task('default', function () {
            gulpConnect.server({
                livereload: true,
                port: config.devServer.port,
                host: '0.0.0.0',
                middleware: function (connect, opt) {
                    return [
                        httpProxyMiddleware('/', {
                            target: 'http://localhost:' + String(config.devServer.port + 1),
                            changeOrigin: true
                        })
                    ];
                }
            });
            gulp.watch(config.devServer.watch_html, ['html']);
            gulp.watch(config.devServer.watch_js, ['webpack']);
            webdevjs.runweb(config);
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
        server.listen(port + 1, function () {
            console.log("listen 0.0.0.0:%d", port + 1);
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