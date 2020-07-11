# Node.js Review
A review of some of the main modules, methods, and concepts of Node.js.

### 👋 Hello, World!
With node, you can print to the terminal with a simple `console.log`.
```javascript
console.log("Hello, world!");
```

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