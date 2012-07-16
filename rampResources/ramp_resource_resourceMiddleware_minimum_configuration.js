var http = require("http");
var rs = require("ramp-resources");
var middleware = rs.resourceMiddleware.create("/resources");

http.createServer(function (req, res) {
    if (middleware.respond(req, res)) { return; }

    res.writeHead(418);  // I'm a teapot
    res.end("Short and stout");
}).listen(8000);
