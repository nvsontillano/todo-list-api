const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./storage/database.sqlite", // Path to the file that will store the SQLite DB.
  });

module.exports = sequelize;