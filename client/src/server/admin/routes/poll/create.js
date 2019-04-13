const { exists } = require("../../helpers");
const { verifyToken } = require("../../../__globalHelpers/index");

module.exports = async function(Authentication, req, res) {
  console.log("Create poll request");
  try {
    const { name, questions } = req.body.data;
    const { Polls } = Authentication.database.models;
    const errors = [];

    const result = verifyToken(req, res);

    if (!result.id) {
      return;
    }

    if (await exists(Polls, { name: name })) {
      console.log("Create error");
      errors.push({ message: "Poll with given name already exists" });
    }

    if (errors.length > 0) {
      return res.status(200).json({ errors });
    }

    const poll = new Polls({
      name: name,
      questions: questions,
      status: "offline",
      completed: 0
    });

    poll.save((err, result) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).send({ message: "Poll saved" });
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
