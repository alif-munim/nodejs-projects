const http = require("http");

const [urlOne, urlTwo, urlThree] = process.argv.slice(2, 5);
let content = [];
let strings = [];

http.get(urlOne, (res) => {
    res.on("error", console.error);
    res.setEncoding("utf-8");
    res.on("data", (data) => {
        content.push(data);
    })
    res.on("end", () => {
        strings.push(content.join(''));
        content = []
        http.get(urlTwo, (res) => {
            res.on("error", console.error);
            res.setEncoding("utf-8");
            res.on("data", (data) => {
                content.push(data);
            })
            res.on("end", () => {
                strings.push(content.join(''));
                content = []
                http.get(urlThree, (res) => {
                    res.on("error", console.error);
                    res.setEncoding("utf-8");
                    res.on("data", (data) => {
                        content.push(data);
                    })
                    res.on("end", () => {
                        strings.push(content.join(''));
                        content = []
                        strings.forEach(str => {
                            console.log(str);
                        });
                    });
                })
            });
        })
    });
})