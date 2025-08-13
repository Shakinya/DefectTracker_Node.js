const { Model } = require('@sequelize/core');

class Privilege extends Model {}

module.exports = (sequelize, DataTypes) => {
  Privilege.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    privilege_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Privilege name is required" },
        len: { args: [1, 255], msg: "Privilege name must be 1–255 characters" },
      },
    },
  }, {
    sequelize,
    modelName: 'Privilege',
    tableName: 'privileges',
    timestamps: false,
  });

  return Privilege;
};
