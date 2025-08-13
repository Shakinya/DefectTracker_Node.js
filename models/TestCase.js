const { Model } = require('@sequelize/core');

class TestCase extends Model {}

module.exports = (sequelize, DataTypes) => {
  TestCase.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    steps: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    test_case_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    module_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    severity_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sub_module_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TestCase',
    tableName: 'test_case',
    timestamps: false,
  });

  return TestCase;
};
