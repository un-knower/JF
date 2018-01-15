var http = require('http');

var proxy = http.createServer(function(req, res) {
    var options = {
        // host: "172.15.1.205",
        host:"172.88.65.168",
        port: "8885",
        path: req.url,
        method: req.method,
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }

    var sreq = http.request(options, function(sres) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-type", "application/json; charset=utf-8");
        sres.pipe(res);
        sres.on("end", function() {
            console.log(res);
        })
    });
    if (/POSTIPUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
}).listen(8888);
console.log("server started on!");
