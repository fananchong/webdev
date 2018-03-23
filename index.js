#!/usr/bin/env node

var minimist = require('minimist');
var WebDev = require('./webdev.js');

var argv = minimist(process.argv.slice(2), {
    alias: {
        port: 'p',
        config: 'c'
    }
});

if (!argv.port) {
    console.error('Usage: webdev --port [ws-port] --config [config-file]');
    return;
}

var webdev = new WebDev();
webdev.start(argv.port, argv.config);