# Node.js Review
A review of some of the main modules, methods, and concepts of Node.js.

<br/>

### 👋 Hello, World!
With node, you can print to the terminal with a simple `console.log`.
```javascript
console.log("Hello, world!");
```

<br/>

### 💬 Working With Arguments
The `process.argv` array vector contains all of the arguments passed in with the command to run the program.
The first and second elements contain node and system information. The third argument onward is often used within the program.
The program below prints the sum of all integer arguments.
```javascript
let sum = 0;

for (let i = 2; i < process.argv.length; i++) {
    sum += process.argv[i];
}

console.log(sum);
```

<br/>

### 📁 File I/O
The `fs` module allows you to read and write to files.
The program below prints the number of lines in a file provided as the first argument.
```javascript
const fs = require("fs");

const filePath = process.argv[2];
const fileBuffer = fs.readFileSync(filePath);

const fileContents = fileBuffer.toString().split('\n');

console.log(fileContents.length - 1);
```
> Note: the `readFileSync` method returns a buffer object which needs to be converted to a string using `toString()`.

<br/>

### ⌛ Async File I/O
Synchronous methods often have the word *sync* appended to them.
In Node.js, you can also use *asynchronous* methods. 
As an example, the `readFileSync` method is synchronous and blocks execution until it is finished.
Contrariwise, the `readFile` method is asynchronous and non-blocking. It functions in the background and returns immediately once finished.
Asynchronous functions often take callback functions which are called once execution is complete.
```javascript
const fs = require("fs");

const filePath = process.argv[2];

fs.readFile(filePath, (err, data) => {
    console.log(data.toString().split('\n').length - 1);
})
```
> Note: the `readFile` method returns a buffer object which needs to converted to a string using `toString()`.

<br/>

### 🗃 Directories and Extensions
The `fs` module also contains methods for reading directories. Another directory, `path`, can be used to read file extensions.
The program below searches a directory, passed as the first argument, for all files with a given extension, the second argument.
```javascript
const fs = require("fs");
const path = require("path");

const [dirPath, ext] = process.argv.slice(2, 4);

fs.readdir(dirPath, (err, fileList) => {
    fileList.forEach(file => {
        if (path.extname(file) == `.${ext}`) {
            console.log(file);
        }
    });
});
```

<br/>

### 📧 HTTP Client
Node.js contains an `http` module that can be used to send and receive http requests.
The program below makes an http `GET` request to the url provided as the first argument to the program and prints the 
response object in the console in `utf-8` encoding format.
```javascript
const http = require("http");

const myUrl = process.argv[2];
const content = [];

http.get(myUrl, (res) => {
    res.on("error", console.error);
    res.setEncoding("utf-8");
    res.on("data", (data) => {
        console.log("data");
    });
});
```

<br/>

### 📦 HTTP Collect
You can also collect the information received from http `GET` requests. The program below collects the information stored in the data stream inside of an array, and prints the length and content of that array only once the stream has ended.
```javascript
const http = require("http");

const myUrl = process.argv[2];
const dataStream = [];

http.get(myUrl, (res) => {
    res.on("error", console.error);
    res.on("data", (data) => {
        dataStream = [...dataStream, ...data.split('')];
    });
    res.on("end", () => {
        console.log(dataStream.length);
        console.log(dataStream.join(''));
    })
});
```

<br/>

### 🏓 Juggling Async
When working with asynchronous functions, callbacks often need to be used.
The program below takes 3 urls provided as command line arguments and gets their results in sequence using the `http` module.
```javascript
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
```

<br/>

### 🧩 Modules
Node.js encourages separation of concerns through modules that can be imported and exported between different `.js` files.
In the program below, the `fs` module is used to search a directory for all files with a given extension. 
However, most of the functionality is contained in `mymodule.js`, where the `filteredList()` function is exported.
In `make-it-modular.js`, this module is imported through a `require` statement so that the function can be used.

**mymodule.js**
```javascript
const fs = require("fs");
const path = require("path");

function filteredList(dir, ext, callback) {
    let extList = [];

    fs.readdir(dir, (err, fileList) => {
        if (err) {
            callback(err);
        }

        fileList.forEach(file => {
            if (path.extname(file) === `.${ext}`) {
                extList.push(file);
            }
        });
    });

    callback(err, extList);
}

module.exports = filteredList;
```

**make-it-modular.js**
```javascript
const mymodule = require("./mymodule");

const [dirName, extName] = process.argv.slice(2, 4);

mymodule(dirName, extName, (err, extList) => {
    extList.forEach(file => {
        console.log(file);
    });
});
```

<br/>

### 🔌 Sockets & The Net Module
The `net` module can be used to create servers and clients which support `IPC` and `TCP`.
A `socket` is a duplex stream, meaning that it can be both read from and written to.
The `strftime` package from `npm` prints the current date and time in a given format.
```javascript
const net = require("net");
const strftime = require("strftime");

const port = process.argv[2];

const server = net.createServer(socket => {
    socket.write(strftime("%Y-%m-%d %H:%M\n"));
    socket.end();
});

server.listen(port);
```

<br/>

### 📡 HTTP File Server
Like the `net` module, the `http` module can be used to create servers which support http requests.
The program below takes a port number and file path as an argument, and pipes a file **read-stream** to the **response object**.
```javascript
const http = require("http");
const fs = require("fs");

const [port, filePath] = process.argv.slice(2, 4);

const server = http.createServer((req, res) => {
    let fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

server.listen(port);
```

<br/>

### ⬆ HTTP Uppercaserer
The following program converts any text sent through a `POST` request into uppercase. The request *chunk* is converted using the `through2map` npm package and subsequently piped to the response object.
```javascript
const http = require("http");
const map = require("through2map");

const port = process.argv[2];

const server = http.createServer((req, res) => {
    if (req.method == "POST") {
        req.pipe(map(chunk => {
            chunk.toString().toUpperCase()
        })).pipe(res);
    }
});

server.listen(port);
```

<br/>

### ⌚ HTTP JSON API Server
The program below returns a JSON object of the current time in epoch and unix time based on the request url and method.
```javascript
const http = require("http");
const url = require("url");

const port = process.argv[2];

const server = http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://localhost:${port}`);

    if (myURL.pathname == "/api/parsetime" && req.method == "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let myDate = new Date(myURL.searchParams.get("iso"));
        let jsonObj = {
            "hour": myDate.getHours(),
            "minute": myDate.getMinutes(),
            "second": myDate.getSeconds()
        };
        res.end(JSON.stringify(jsonObj));
    }

    if (myURL.pathname == "/api/unixtime" && req.method == "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let myDate = new Date(myURL.searchParams.get("iso"));
        let jsonObj = {
            "unixtime": myDate.getTime()
        }
        res.end(JSON.stringify(jsonObj));
    }
});

server.listen(port);
```