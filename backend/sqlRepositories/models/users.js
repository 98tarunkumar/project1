const { Sequelize } = require('sequelize');
const company = require('./company');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password_expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      company_id_fk: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      timestamps: true
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Company, {
      foreignKey: 'company_id_fk',
      targetKey: 'id'
    });
    User.hasMany(models.Expenses, {
      foreignKey: 'user_id_fk',
      sourceKey: 'id'
    });
  };

  return User;
};
