const { Model } = require('@sequelize/core');

class GroupPrivilege extends Model {}

module.exports = (sequelize, DataTypes) => {
  GroupPrivilege.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    privilege_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'GroupPrivilege',
    tableName: 'group_privilege',
    timestamps: false,
  });

  return GroupPrivilege;
};
