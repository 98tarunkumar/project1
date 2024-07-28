const { Sequelize } = require('sequelize');
const expense_category = require('./expense_category');

module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define(
    'Expenses',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      expense_category_id_fk: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      user_id_fk: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'expenses',
      timestamps: true
    }
  );

  Expenses.associate = (models) => {
    Expenses.belongsTo(models.Expense_Category, {
      foreignKey: 'expense_category_id_fk',
      targetKey: 'id'
    });
    Expenses.belongsTo(models.User, {
      foreignKey: 'user_id_fk',
      targetKey: 'id'
    });
    Expenses.hasMany(models.File, {
      foreignKey: 'expenses_id_fk',
      sourceKey: 'id'
    });
  };

  return Expenses;
};
