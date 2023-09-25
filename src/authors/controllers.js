const Author = require("./model");

const addAuthor = async (req, res) => {
  try {
    const result = await Author.create({
      author: req.body.author,
    });

    res
      .status(201)
      .json({ result: result, message: `${result.author} added to db` });
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
};

module.exports = {
  addAuthor: addAuthor,
};
