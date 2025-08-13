const { Model } = require('@sequelize/core');

class SubModule extends Model {}

module.exports = (sequelize, DataTypes) => {
  SubModule.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sub_module_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Sub Module ID is required" },
      },
    },
    sub_module_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Sub Module Name is required" },
      },
    },
    modules_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SubModule',
    tableName: 'sub_module',
    timestamps: false,
  });

  return SubModule;
};
