const http = require("http");
const url = require("url");

const port = process.argv[2];

const server = http.createServer((req, res) => {
    let urlObject = new URL(req.url, `http://localhost:${port}`);
    
    if (urlObject.pathname == "/api/parsetime" && req.method == "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        const dateObj = new Date(urlObject.searchParams.get("iso"));
        const [hours, minutes, seconds] = [dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds()];
        const jsonObj = {
            "hour": hours,
            "minute": minutes,
            "second": seconds
        };
        res.end(JSON.stringify(jsonObj));
    }

    else if (urlObject.pathname == "/api/unixtime" && req.method == "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        const dateObj = new Date(urlObject.searchParams.get("iso"));
        const jsonObj = {
            "unixtime": dateObj.getTime()
        }
        res.end(JSON.stringify(jsonObj));
    }

});

server.listen(port);