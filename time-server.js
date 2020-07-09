const net = require("net");
const strftime = require("strftime");

const port = process.argv[2];

const server = net.createServer((socket) => {
    // socket handling
    socket.write(strftime("%Y-%m-%d %H:%M\n"));
    socket.end();
});

server.listen(port);