const http = require("http");
const fs = require("fs");

const [port, filePath] = process.argv.slice(2, 4);

const server = http.createServer((req, res) => {
    let fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

server.listen(port);