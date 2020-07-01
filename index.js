const spawn = require("child_process").spawn;

const pythonProcess = spawn("python", ["api.py"]);
pythonProcess.stdout.on("data", (data) => {

    myStr = data.toString();
    myObj = JSON.parse(myStr);

    console.log(myObj.data);

});