// models/Role.js
const { Model } = require('@sequelize/core');

class Role extends Model {}

module.exports = (sequelize, DataTypes) => {
  Role.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Role is required" },
      len: { args: [1, 255], msg: "Role must be 1–255 characters" },
    },
  },
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'Role',
  timestamps: false,
});


  return Role;
};
