const mymodule = require("./mymodule");

const dirPath = process.argv[2];
const extName = process.argv[3];

mymodule(dirPath, extName, (err, list) => {
    list.forEach(file => {
        console.log(file);
    });
});