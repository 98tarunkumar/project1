module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define(
    'File',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expenses_id_fk: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: 'files',
      timestamps: true
    }
  );

  Files.associate = (models) => {
    Files.belongsTo(models.Expenses, {
      foreignKey: 'expenses_id_fk',
      targetKey: 'id'
    });
  };

  return Files;
};
