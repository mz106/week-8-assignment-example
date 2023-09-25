const { Router } = require("express");
const bookRouter = Router();

const { addSingleBook, getAllBooks } = require("./controllers");

bookRouter.post("/addsinglebook", addSingleBook);

bookRouter.get("/getallbooks", getAllBooks);

module.exports = bookRouter;
