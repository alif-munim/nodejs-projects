# Node.js Review
A review of some of the main modules, methods, and concepts of Node.js.

### Hello, World!
With node, you can print to the terminal with a simple `console.log`.
```javascript
console.log("Hello, world!");
```

### Working With Arguments
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

### File I/O
The `fs` module allows you to read and write to files.
The program below prints the number of lines in a file provided as the first argument.
```javascript
const fs = require("fs");

const filePath = process.argv[2];
const fileBuffer = fs.readFileSync(filePath);

const fileContents = fileBuffer.toString().split('\n');

console.log(fileContents.length - 1);
```
> Note: the `readFileSync` method returns a buffer object which needs to be turned into a string.

### Async File I/O
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
> Note: the `readFileSync` method returns a buffer object which needs to be turned into a string.

