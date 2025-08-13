const { Model } = require('@sequelize/core');

class ProjectAllocation extends Model {}

module.exports = (sequelize, DataTypes) => {
  ProjectAllocation.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    allocation_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProjectAllocation',
    tableName: 'project_allocation',
    timestamps: false,
  });

  return ProjectAllocation;
};
