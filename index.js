const http = require("http");
const parse = require("./ParseRoute");
const fs = require("fs");

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.writeHead(200, {"Content-Type": "text/html"})
        const readStream = fs.createReadStream(__dirname + "/index.html");
        readStream.pipe(response);
    } else {
        let timeObj = parse.ParseRoute(request.url);
        response.writeHead(200, {"Content-Type": "application/json"})
        response.end((JSON.stringify(timeObj)));
    }
});

server.listen(process.env.PORT);