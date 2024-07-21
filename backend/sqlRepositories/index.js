// connect to database using sequelize
const config = require('config');
const Sequelize = require('sequelize');
const dbConfig = config.get('database');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: 'password',
  database: 'project1'
});

// fetch models from models folder

const fs = require('fs');
const path = require('path');

const models = {};

fs.readdirSync(path.join(__dirname, 'models')).forEach((file) => {
  const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes);
  models[model.name] = model;
});

// create associations

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// sync models with database when alter is true
if (config.get('database.alter')) {
  sequelize
    .sync()
    .then(() => {
      console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
      console.log('Error synchronizing models', err);
    });
}

module.exports = {
  sequelize,
  models
};
