var Readable = require('stream').Readable;

const content = process.argv[2];

const myStream = new Readable();
myStream._read = () => {
    myStream.push(content.toString());
    myStream.push(null);
};

myStream.pipe(process.stdout);