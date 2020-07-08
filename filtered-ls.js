const fs = require("fs");
const path = require("path");

const dirPath = process.argv[2];
const ext = process.argv[3];

fs.readdir(dirPath, (err, list) => {
    list.forEach(file => {
        let thisExt = path.extname(file).split('');
        thisExt.shift();
        if (thisExt.join('') == ext) {
            console.log(file);
        }
    });
});