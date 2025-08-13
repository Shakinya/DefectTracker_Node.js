const { Model } = require('@sequelize/core');

class ReleaseType extends Model {}

module.exports = (sequelize, DataTypes) => {
  ReleaseType.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    release_type_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Release type name is required" },
        len: { args: [1, 25], msg: "Release type name must be 1–25 characters" },
      },
    },
  }, {
    sequelize,
    modelName: 'ReleaseType',
    tableName: 'release_type',
    timestamps: false,
  });

  return ReleaseType;
};
