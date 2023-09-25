const { Router } = require("express");
const bookRouter = Router();

const {
  addSingleBook,
  getAllBooks,
  getBookByTitle,
  updateBookByTitleDynamic,
  deleteSingleBookByTitle,
  deleteAllBooks,
} = require("./controllers");

bookRouter.post("/addsinglebook", addSingleBook);

bookRouter.get("/getallbooks", getAllBooks);

bookRouter.get("/getbookbytitle/:title", getBookByTitle);

bookRouter.put("/updatebookbytitledynamic", updateBookByTitleDynamic);

bookRouter.delete("/deletesinglebookbytitle", deleteSingleBookByTitle);

bookRouter.delete("/deleteallbooks", deleteAllBooks);

module.exports = bookRouter;
