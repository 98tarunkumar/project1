module.exports = (sequelize, DataTypes) => {
  const Expense_Category = sequelize.define(
    'Expense_Category',
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
      max_amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'expense_categories',
      timestamps: true
    }
  );

  Expense_Category.associate = (models) => {
    Expense_Category.hasOne(models.Expenses, {
      foreignKey: 'expense_category_id_fk',
      sourceKey: 'id'
    });
  };

  return Expense_Category;
};
