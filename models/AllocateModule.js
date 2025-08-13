const { Model } = require('@sequelize/core');

class AllocateModule extends Model {}

module.exports = (sequelize, DataTypes) => {
  AllocateModule.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    modules_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sub_module_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AllocateModule',
    tableName: 'allocate_module',
    timestamps: false
  });

  return AllocateModule;
};
