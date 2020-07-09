const fs = require("fs");
const path = require("path");

function filteredList(dir, ext, callback) {
    
    fs.readdir(dir, (err, list) => {
        if (err) {
            return callback(err);
        }

        let newList = [];
        let fullExt = "." + ext;

        list.forEach(file => {
            if (path.extname(file) == fullExt) {
                newList.push(file);
            }
        })

        // const newList = list.filter(file => {
        //     path.extname(file) == ext
        // });

        callback(null, newList);
    });
}

module.exports = filteredList;