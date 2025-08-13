const { Model } = require('@sequelize/core');

class Bench extends Model {}

module.exports = (sequelize, DataTypes) => {
  Bench.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    allocated: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bench_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Bench',
    tableName: 'bench',
    timestamps: false,
  });

  return Bench;
};
