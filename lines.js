const split = require("split");
const through2 = require("through2");

process.stdin
    .pipe(split('\n'))
    .pipe(through2((line, encoding, next) => {
        console.dir(line.toString());
        next();
    }))