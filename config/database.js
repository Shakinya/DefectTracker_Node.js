// config/database.js
const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'node_project',
  user: 'root',               // ✅ Correct key is `user`, not `username`
  password: 'root',
  host: 'localhost',
  port: 3306,
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
