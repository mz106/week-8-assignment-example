require("dotenv").config();
const express = require("express");

const Book = require("./books/model");

const bookRouter = require("./books/routes");

const port = process.env.PORT || 5001;

const app = express();

const syncTables = () => {
  Book.sync();
};

app.use(express.json());

app.use("/books", bookRouter);

app.use("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
