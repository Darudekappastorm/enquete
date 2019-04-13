module.exports = async function(Authentication, req, res) {
  try {
    console.log("get polls");
    const { Polls } = Authentication.database.models;
    const { query } = req.body;
    const errors = [];

    if (errors.length > 0) {
      return res.status(400).json({ errors: [errors] });
    }

    if (query) {
      return Polls.find(query, (err, result) => {
        if (err) {
          return res.status(400).json({ errors: err });
        }

        return res.status(200).send(result);
      });
    }

    Polls.find((err, result) => {
      if (err) {
        return res.status(400).json({ errors: err });
      }

      return res.status(200).send(result);
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
