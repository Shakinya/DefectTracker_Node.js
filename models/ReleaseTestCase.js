const { Model } = require('@sequelize/core');

class ReleaseTestCase extends Model {}

module.exports = (sequelize, DataTypes) => {
  ReleaseTestCase.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    release_test_case_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    test_case_status: {
      type: DataTypes.ENUM('FAIL', 'NEW', 'PASS'),
      allowNull: false,
    },
    test_date: {
      type: DataTypes.DATE(6), // MySQL DATETIME(6)
      allowNull: false,
    },
    test_time: {
      type: DataTypes.TIME, // MySQL TIME
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    release_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    test_case_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ReleaseTestCase',
    tableName: 'release_test_case',
    timestamps: false,
  });

  return ReleaseTestCase;
};
