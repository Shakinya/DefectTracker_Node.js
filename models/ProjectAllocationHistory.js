const { Model } = require('@sequelize/core');

class ProjectAllocationHistory extends Model {}

module.exports = (sequelize, DataTypes) => {
  ProjectAllocationHistory.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // Sequelize uses BOOLEAN instead of BIT
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
    modelName: 'ProjectAllocationHistory',
    tableName: 'project_allocation_history',
    timestamps: false,
  });

  return ProjectAllocationHistory;
};
