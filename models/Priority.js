const { Model } = require('@sequelize/core');

class Priority extends Model {}

module.exports = (sequelize, DataTypes) => {
  Priority.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Color is required" },
        len: { args: [1, 255], msg: "Color must be 1–255 characters" },
      },
    },
    priority: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Priority is required" },
        len: { args: [1, 255], msg: "Priority must be 1–255 characters" },
      },
    },
  }, {
    sequelize,
    modelName: 'Priority',
    tableName: 'priority',
    timestamps: false,
  });

  return Priority;
};
