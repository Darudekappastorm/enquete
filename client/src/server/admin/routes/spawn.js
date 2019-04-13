const { spawn } = require("child_process");
const validateJWT = require("../../__globalHelpers/verify-token");
let spawnedProcesses = [];

module.exports = async function(req, res, v) {
  try {
    const { name, port, dir, command } = req.body;

    const token = validateJWT(req, res);
    if (!token.id) {
      return;
    }

    if (token.access_levels[0] < 10) {
      return res.status(400).send("Only admins can manage and spawn sessions");
    }

    let validator = new v(req.body, {
      name: "required",
      port: "required",
      dir: "required",
      command: "required"
    });

    if (command === "kill") {
      return killProcess(req, res, name, port, dir);
    }

    const errors = await validator.check().then(function(matched) {
      if (!matched) {
        return validator.errors;
      }
    });

    if (errors) {
      return res.status(400).send(errors);
    }

    const processAlreadySpawned = containsObject(
      { name: name },
      spawnedProcesses
    );

    if (processAlreadySpawned) {
      return res.status(400).send("Process is already spawned");
    }

    console.log("Spawning service....");
    const child = await spawn("node", ["../../services/" + dir]);
    spawnedProcesses.push({ name: name, port: port, dir: dir, process: child });

    child.stdout.on("data", data => {
      console.log(name + ": " + data);
    });
    child.stderr.on("data", data => {
      console.log(name + ": " + data);
    });
    child.on("close", code => {
      console.log("Closing service: " + name);
    });

    res.status(200).send("Service spawned");
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};

const killProcess = (req, res, name, port, dir, q) => {
  const result = containsObject({ name: name }, spawnedProcesses);
  if (!result) {
    return res.status(404).send("Process not found");
  }
  const killed = spawnedProcesses[result.index].process.kill();
  spawnedProcesses.splice(result.index, 1);
  return res.status(400).send(killed);
};

function containsObject(obj, arrayOfObjects) {
  const result = arrayOfObjects.map((value, index) => {
    if (obj.name === value.name) {
      return { result: true, index: index };
    }
  });

  if (result[0]) {
    return result[0];
  }
  return false;
}
