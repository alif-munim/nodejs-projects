const fs = require("fs");
const path = require("path");

function filteredList(dir, ext, callback) {
    
    fs.readdir(dir, (err, list) => {
        if (err) {
            return callback(err);
        }

        const newList = list.filter(file => {
            path.extname(file) == ext
        });

        callback(null, newList);
    });
}

module.exports = filteredList;