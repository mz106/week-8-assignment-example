const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.MYSQL_URI);

connection.authenticate();

module.exports = connection;
