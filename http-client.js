const http = require("http");

const myUrl = process.argv[2];

http.get(myUrl, (res) => {
    res.setEncoding("utf-8");
    res.on("data", (data) => {
        console.log(data);
    });
    res.on("error", console.error);
}).on("error", console.error);