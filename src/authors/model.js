const { DataTypes } = require("sequelize");
const connection = require("../db/connetion");

const Author = connection.define(
  "Author",
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Author;
