const spawn = require("child_process").spawn;

const pythonProcess = spawn("python", ["csvjson.py"]);
pythonProcess.stdout.on("data", (data) => {

    myStr = data.toString();
    myObj = JSON.parse(myStr);

    for (happyPoint in myObj) {
        console.log(happyPoint);
    }

});