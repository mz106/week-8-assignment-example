const Author = require("./model");
const Book = require("../books/model");

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

const getAuthorAndBooks = async (req, res) => {
  try {
    const result = await Author.findOne({
      where: {
        author: req.params.author,
      },
      include: Book,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
};

module.exports = {
  addAuthor: addAuthor,
  getAuthorAndBooks: getAuthorAndBooks,
};
