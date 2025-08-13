const { Model } = require('@sequelize/core');

class ProjectUserPrivilege extends Model {}

module.exports = (sequelize, DataTypes) => {
  ProjectUserPrivilege.init({
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
    modelName: 'ProjectUserPrivilege',
    tableName: 'project_user_privilege',
    timestamps: false,
  });

  return ProjectUserPrivilege;
};
