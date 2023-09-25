const Book = require("./model");
const Author = require("../authors/model");

// add single book to db on /books/addsinglebook
const addSingleBook = async (req, res) => {
  try {
    //checks to see if author already exists
    // return an array with 2 elements
    // 1. new entry (obj)
    // 2. boolean (has been created = true, found = false)
    // uses array destructuring
    const [author, authorCreated] = await Author.findOrCreate({
      where: { author: req.body.author },
    });

    //creates book - will return an object
    const result = await Book.create({
      title: req.body.title,
      // adding the id from the found/created author
      AuthorId: author.dataValues.id,
      //if genre missing and is empty string, send undefined so model default genre is put in
      // if req.body.genre is missing entirely, model default will occur
      genre: req.body.genre === "" ? undefined : req.body.genre,
    });

    // will send back res with 201 - book created

    res.status(201).json({
      result: result,
      message: `${result.title} has been added to the db`,
    });
  } catch (error) {
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

// get all books on /books/getallbooks
const getAllBooks = async (req, res) => {
  try {
    const result = await Book.findAll();

    res.status(200).json({ result: result, message: "all books found" });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

// get a single book by title on /books/getbookbytitle/:title
const getBookByTitle = async (req, res) => {
  try {
    // Book.findone() finds a book - return object if exists, null if does not exist
    const result = await Book.findOne({
      where: { title: req.params.title },
    });

    res.status(200).json({ result: result, message: `${result.title} found` });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

// update book by title (update title or genre or author) on /books/updatebookbytitledynamic
const updateBookByTitleDynamic = async (req, res) => {
  try {
    // Book.update() updates book - will return array
    // array will have an integer with number of updated books @ result[0]
    // if result[0] >= 1 book(s) have been updated
    // if result[0] === 0 no books updated
    const result = await Book.update(
      {
        // use of dynamic object key
        // request has value "updateKey" for update object key
        // request has value "updateValue" for update object value
        [req.body.updateKey]: req.body.updateValue,
      },
      { where: { title: req.body.title } }
    );

    res
      .status(201)
      .json({ result: result, message: `${req.body.title} updated` });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

const deleteSingleBookByTitle = async (req, res) => {
  try {
    // Book.destroy() will return an integer of the number of books deleted
    const result = await Book.destroy({
      where: { title: req.body.title },
    });

    // 204 will not send a response body
    // instead of .json() we use .send() to send no content
    res.status(204).send();

    res.status(404).json({ message: "no deletion occured" });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.destroy({
      where: {},
      truncate: true,
    });

    res.status(204).send();
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

module.exports = {
  addSingleBook: addSingleBook,
  getAllBooks: getAllBooks,
  getBookByTitle: getBookByTitle,
  updateBookByTitleDynamic: updateBookByTitleDynamic,
  deleteSingleBookByTitle: deleteSingleBookByTitle,
  deleteAllBooks: deleteAllBooks,
};
