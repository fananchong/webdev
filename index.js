#!/usr/bin/env node

var minimist = require('minimist');
var WebDev = require('./webdev.js');

var argv = minimist(process.argv.slice(2), {
    alias: {
        config: 'c'
    }
});

var webdev = new WebDev();
webdev.start(argv.config);