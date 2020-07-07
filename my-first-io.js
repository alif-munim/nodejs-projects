const fs = require("fs");

const filePath = process.argv[2];

const fileBuffer = fs.readFileSync(filePath);

const numLines = fileBuffer.toString().split("\n").length

console.log(numLines - 1)