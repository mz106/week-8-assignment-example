const { Router } = require("express");
const authorRouter = Router();

const { addAuthor, getAuthorAndBooks } = require("./controllers");

authorRouter.post("/addauthor", addAuthor);

authorRouter.get("/getauthorandbooks/:author", getAuthorAndBooks);

module.exports = authorRouter;
