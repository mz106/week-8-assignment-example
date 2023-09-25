const Book = require("./model");

// add single book to db on /books/addsinglebook
const addSingleBook = async (req, res) => {
  try {
    // checks to see if title is present - if not, send 422 status in res
    if (req.body.title) {
      //creates book - will return an object
      const result = await Book.create({
        title: req.body.title,
        //if author missing and is empty string, send undefined so model default author is put in
        // if req.body.author is missing entirely, model default will occur
        author: req.body.author === "" ? undefined : req.body.author,
        //if genre missing and is empty string, send undefined so model default genre is put in
        // if req.body.genre is missing entirely, model default will occur
        genre: req.body.genre === "" ? undefined : req.body.genre,
      });
      //checks if result (return from Book.create()) has a title
      // if so, will send back res with 201 - book created
      if (result.title) {
        res.status(201).json({
          result: result,
          message: `${result.title} has been added to the db`,
        });
        return;
      }
    } else {
      // if title is missing, send back response 422 (unprocessable entry) unable to
      // create book title is missing
      res.status(422).json({
        message: "unable to create book, title missing from request body",
      });
      return;
    }

    // for some other failure which is not an error
    res.status(424).json({
      result: result,
      message: `${req.body.title} has failed to be added to the db`,
    });
  } catch (error) {
    // if book already exists, an error occurs. This specifies the error with 409 status code
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(409)
        .json({ error: error, errorMessage: "book already exist" });
      return;
    }
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

// get all books on /books/getallbooks
const getAllBooks = async (req, res) => {
  try {
    // find all books - will return array
    const result = await Book.findAll();

    // checks result array has elements - if yes will return 201 and result array
    if (result.length > 0) {
      res.status(200).json({ result: result, message: "all books found" });
      return;
    }

    // if result array empty (i.e. no books on db) will return 404 not found
    res.status(404).json({ message: "books not found" });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

// get a single book by title on /books/getbookbytitle/:title
const getBookByTitle = async (req, res) => {
  console.log("!!!!!!!!!!!!!: ", req.params);
  try {
    // Book.findone() finds a book - return object if exists, null if does not exist
    const result = await Book.findOne({
      where: { title: req.params.title },
    });

    // checks is result is null (falsy) - if null/falsy will return status 404
    // instead of going to error
    if (!result) {
      res.status(404).json({ message: `${req.params.title} does not exist` });
      return;
    }

    // checks if result.title exists - if so will send 200 exists res
    if (result.title) {
      res
        .status(200)
        .json({ result: result, message: `${result.title} found` });
      return;
    }
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

module.exports = {
  addSingleBook: addSingleBook,
  getAllBooks: getAllBooks,
  getBookByTitle: getBookByTitle,
};
