const { Router } = require("express");
const bookRouter = Router();

const { addSingleBook } = require("./controllers");

bookRouter.post("/addsinglebook", addSingleBook);

module.exports = bookRouter;
