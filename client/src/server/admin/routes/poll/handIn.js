const { update } = require("../../helpers/");

module.exports = async function(Admin, req, res) {
  try {
    const { poll } = req.body;
    const { username, questions, name, _id } = poll;
    const { Results, Polls } = Admin.database.models;
    const errors = [];

    if (errors.length > 0) {
      return res.status(200).json({ errors });
    }

    const result = new Results({
      username: username,
      name: name,
      questions: questions,
      target: _id
    });

    result.save(async (err, result) => {
      if (err) {
        errors.push({ message: err });
      }
      update(Polls, { _id: _id }, { $inc: { completed: 1 } });

      return res.status(200).send({ message: "Result saved" });
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
