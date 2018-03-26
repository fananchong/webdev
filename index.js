#!/usr/bin/env node

(function () {
    'use strict';

    var minimist = require('minimist');
    var argv = minimist(process.argv.slice(2), {
        alias: {
            config: 'c'
        }
    });

    var webdevjs = require('./webdev.js');
    webdevjs.start(argv.config);

})();