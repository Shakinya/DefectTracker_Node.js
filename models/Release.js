const { Model } = require('@sequelize/core');

class Release extends Model {}

module.exports = (sequelize, DataTypes) => {
  Release.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    release_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    release_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    releasedate: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // Sequelize maps to BIT(1) in MySQL
      allowNull: false,
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    release_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Release',
    tableName: 'releases',
    timestamps: false,
  });

  return Release;
};
