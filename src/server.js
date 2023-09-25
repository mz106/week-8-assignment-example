const express = require("express");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
