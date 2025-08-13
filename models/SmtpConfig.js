const { Model } = require('@sequelize/core');

class SmtpConfig extends Model {}

module.exports = (sequelize, DataTypes) => {
  SmtpConfig.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    from_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    from_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    smtp_host: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    smtp_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SmtpConfig',
    tableName: 'smtp_config',
    timestamps: false,
  });

  return SmtpConfig;
};
