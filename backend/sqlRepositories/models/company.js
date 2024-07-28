module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'companies',
      timestamps: true
    }
  );

  Company.associate = (models) => {
    Company.hasMany(models.User, {
      foreignKey: 'company_id_fk',
      sourceKey: 'id'
    });
  };

  return Company;
};
