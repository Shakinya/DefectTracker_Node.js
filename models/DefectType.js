const { Model } = require('@sequelize/core');

class DefectType extends Model {}

module.exports = (sequelize, DataTypes) => {
  DefectType.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    defect_type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Defect type name is required" },
        len: { args: [1, 255], msg: "Defect type name must be 1–255 characters" },
      },
    },
  }, {
    sequelize,
    modelName: 'DefectType',
    tableName: 'defect_type',
    timestamps: false,
  });

  return DefectType;
};
