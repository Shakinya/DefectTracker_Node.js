// models/UserPrivilege.js
const { Model } = require('@sequelize/core');

class UserPrivilege extends Model {}

module.exports = (sequelize, DataTypes) => {
  UserPrivilege.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    privilege_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserPrivilege',
    tableName: 'user_privilege',
    timestamps: false,
  });

  return UserPrivilege;
};
