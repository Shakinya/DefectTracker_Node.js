const { Model } = require('@sequelize/core');

class Defect extends Model {}

module.exports = (sequelize, DataTypes) => {
  Defect.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    defect_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    re_open_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    assigned_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    defect_status_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    modules_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    priority_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    release_test_case_id: {
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
    modelName: 'Defect',
    tableName: 'defect',
    timestamps: false,
  });

  return Defect;
};
