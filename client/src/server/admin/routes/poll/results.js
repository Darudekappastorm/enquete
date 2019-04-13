module.exports = async function(Admin, req, res) {
  try {
    const { id } = req.body;
    const { Results } = Admin.database.models;
    const errors = [];

    if (!id) {
      errors.push({ message: "ID required" });
    }

    if (errors.length > 0) {
      return res.status(200).json({ errors });
    }

    Results.find({ target: id }, (err, result) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).send(result);
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
