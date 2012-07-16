var http = require("http");
var rs = require("ramp-resources");
var middleware = rs.resourceMiddleware.create("/resources");
var set = rs.resourceSet.create();

set.addResource({ path: "/buster.js", content: "buster - Booyah!" });
set.addResource({ path: "/sinon.js",  content: "sinon  - Booyah!" });

middleware.mount("/x", set);

http.createServer(function (req, res) {
    if (middleware.respond(req, res)) { return; }

    res.writeHead(418);
    res.end("Short and stout");
}).listen(8000);

// Test it
http.request({
    host: "localhost",
    port: 8000,
    path: "/resources/x/buster.js"
}, function (res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        console.log(chunk);
    });
}).end();

http.request({
    host: "localhost",
    port: 8000,
    path: "/resources/x/sinon.js"
}, function (res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        console.log(chunk);
    });
}).end();
