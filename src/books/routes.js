const { Router } = require("express");
const bookRouter = Router();

const {
  addSingleBook,
  getAllBooks,
  getBookByTitle,
  updateBookByTitleDynamic,
} = require("./controllers");

bookRouter.post("/addsinglebook", addSingleBook);

bookRouter.get("/getallbooks", getAllBooks);

bookRouter.get("/getbookbytitle/:title", getBookByTitle);

bookRouter.put("/updatebookbytitledynamic", updateBookByTitleDynamic);

module.exports = bookRouter;
