const { Model } = require('@sequelize/core');

class Designation extends Model {}

module.exports = (sequelize, DataTypes) => {
  Designation.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  designation: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Designation is required" },
      len: { args: [1, 255], msg: "Designation must be 1–255 characters" },
    },
  },
}, {
  sequelize,
  modelName: 'Designation',
  tableName: 'designation',
  timestamps: false,
});


  return Designation;
};
