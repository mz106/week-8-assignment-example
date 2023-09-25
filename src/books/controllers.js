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
        // request has value "updateKey"
        [req.body.updateKey]: req.body.updateValue,
      },
      { where: { title: req.body.title } }
    );

    console.log("!!!!!!!!!!!!!: ", result);
    if (result[0] === 1) {
      res
        .status(201)
        .json({ result: result, message: `${req.body.title} updated` });
      return;
    }

    // if result[0] === 0 send not found 404 in res
    res
      .status(404)
      .json({ result: result, message: `${req.body.title} not found` });
  } catch (error) {
    // general error
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

const deleteSingleBookByTitle = async (req, res) => {
  try {
    // checks if req.body.title exists - if not send 422 response (unprocessable entry)
    if (!req.body.title) {
      res.status(422).json({ message: "req.body.title does not exist" });
      return;
    }
    // Book.destroy() will return an integer of the number of books deleted
    const result = await Book.destroy({
      where: { title: req.body.title },
    });

    // check is result (book deletion number) is equal to 1
    // if it is then send res with 204 status code
    // 204 status code cannot had a response body i.e. send no data or message
    if (result) {
      // 204 will not send a response body
      // instead of .json() we use .send() to send no content
      res.status(204).send();
      return;
    }

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
