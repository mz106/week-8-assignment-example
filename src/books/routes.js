const { Router } = require("express");
const bookRouter = Router();

const { addSingleBook, getAllBooks, getBookByTitle } = require("./controllers");

bookRouter.post("/addsinglebook", addSingleBook);

bookRouter.get("/getallbooks", getAllBooks);

bookRouter.get("/getbookbytitle/:title", getBookByTitle);

module.exports = bookRouter;
