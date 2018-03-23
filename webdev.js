var express = require('express');
var W2T = require('websocket2tcpsocket');
module.exports = WebDev;

function WebDev() { }

var proto = WebDev.prototype;

proto.start = function (port, publish) {
    var www = express();
    if (!!publish) {
        www.use('/', express.static(publish));
    } else {
        www.use('/', express.static('.'));
    }
    www.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });
    var server = www.listen(port, function () {
        console.log("listen 0.0.0.0:%d", port);
    });
    var w2t = new W2T();
    w2t.start({ server: server });
};
