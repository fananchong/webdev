#!/usr/bin/env node

var minimist = require('minimist');
var WebDev = require('./webdev.js');

var argv = minimist(process.argv.slice(2), {
    alias: {
        port: 'p',
        publish: 'ph'
    }
});

if (!argv.port) {
    console.error('Usage: webdev --port [ws-port] --publish [publish-path]');
    process.exec(1);
}

console.log('argv.port =', argv.port);
console.log('argv.publish =', argv.publish);

var webdev = new WebDev();
webdev.start(argv.port, argv.publish);