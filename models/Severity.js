const { Model } = require('@sequelize/core');

class Severity extends Model {}

module.exports = (sequelize, DataTypes) => {
  Severity.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    severity_color: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Severity color is required" },
        len: { args: [1, 255], msg: "Severity color must be 1–255 characters" },
      },
    },
    severity_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Severity name is required" },
        len: { args: [1, 255], msg: "Severity name must be 1–255 characters" },
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Weight must be an integer" },
      },
    },
  }, {
    sequelize,
    modelName: 'Severity',
    tableName: 'severity',
    timestamps: false,
  });

  return Severity;
};
