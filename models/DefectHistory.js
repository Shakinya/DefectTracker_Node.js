const { Model } = require('@sequelize/core');

class DefectHistory extends Model {}

module.exports = (sequelize, DataTypes) => {
  DefectHistory.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    assigned_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    assigned_to: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    defect_date: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    defect_ref_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    defect_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    defect_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    previous_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    record_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    release_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    defect_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'DefectHistory',
    tableName: 'defect_history',
    timestamps: false,
  });

  return DefectHistory;
};
