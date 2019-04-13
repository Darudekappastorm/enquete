var exec = require("child_process").exec;
var child = exec("nodemon authentication/index.js");

child.stdout.on("data", function(data) {
  console.log(data);
});
child.stderr.on("data", function(data) {
  console.log(data);
});
child.on("close", function(code) {
  console.log("closing code: " + code);
});
