const { DataTypes } = require("sequelize");
const connection = require("../db/connetion");

const Book = connection.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: "author missing",
    },
    genre: {
      type: DataTypes.STRING,
      defaultValue: "genre missing",
    },
  },
  { timestamps: false }
);

module.exports = Book;
