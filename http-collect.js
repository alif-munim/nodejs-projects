const http = require("http");

const myUrl = process.argv[2];
let dataStream = [];

http.get(myUrl, (res) => {

    res.setEncoding("utf-8");

    res.on("error", console.error);
    res.on("data", (data) => {
        dataStream = [...dataStream, ...data.split('')]
    });
    res.on("end", () => {
        console.log(dataStream.length);
        console.log(dataStream.join(''));
    })
}).on("error", console.error);