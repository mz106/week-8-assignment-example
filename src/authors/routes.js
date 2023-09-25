const { Router } = require("express");
const authorRouter = Router();

const { addAuthor } = require("./controllers");

authorRouter.post("/addauthor", addAuthor);

module.exports = authorRouter;
