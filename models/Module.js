const { Model } = require('@sequelize/core');

class Module extends Model {}

module.exports = (sequelize, DataTypes) => {
  Module.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Module ID is required" },
      },
    },
    module_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Module name is required" },
      },
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: false,
  });

  return Module;
};
