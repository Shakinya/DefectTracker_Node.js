const { Model } = require('@sequelize/core');

class Project extends Model {}

module.exports = (sequelize, DataTypes) => {
  Project.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    client_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: { msg: "Must be a valid email" },
      },
    },
    end_date: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    kloc: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    project_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    project_status: {
      type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'INACTIVE', 'ON_HOLD'),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'project',
    timestamps: false,
  });

  return Project;
};
