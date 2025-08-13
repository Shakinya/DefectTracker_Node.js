const { Model } = require('@sequelize/core');

class DefectStatus extends Model {}

module.exports = (sequelize, DataTypes) => {
  DefectStatus.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    color_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Color code is required" },
        len: { args: [1, 255], msg: "Color code must be 1–255 characters" },
      },
    },
    defect_status_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Defect status name is required" },
        len: { args: [1, 255], msg: "Defect status name must be 1–255 characters" },
      },
    },
  }, {
    sequelize,
    modelName: 'DefectStatus',
    tableName: 'defect_status',
    timestamps: false,
  });

  return DefectStatus;
};
