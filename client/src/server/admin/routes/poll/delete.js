const { exists } = require("../../helpers");
const { verifyToken } = require("../../../__globalHelpers/index");

module.exports = async function(Admin, req, res) {
  console.log("Remove poll request");
  try {
    const { id } = req.body;
    const { Polls, Results } = Admin.database.models;
    const errors = [];

    const result = verifyToken(req, res);

    if (!result.id) {
      return;
    }

    if (!id) {
      errors.push({ message: "ID is required" });
    }

    if (!(await exists(Polls, { _id: id }))) {
      errors.push({ message: "Poll not found" });
    }

    if (errors.length > 0) {
      return res.status(200).json({ errors });
    }

    if (await exists(Results, { target: id })) {
      //Delete results
      Results.deleteMany({ target: id }, (err, result) => {
        if (err) {
          return res.status(400).json({ errors: err });
        }

        return;
      });
    }

    return Polls.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }

      return res.status(200).send({ message: "Record succesfully deleted" });
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
