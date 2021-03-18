const Sequelize = require('sequelize');
const Task = require('../app/models/Task');

const User = require('../app/models/User');

const databaseConfig = require('../config/database');

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco de dados com as Models
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
