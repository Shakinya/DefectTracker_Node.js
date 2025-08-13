const { Model } = require('@sequelize/core');

class User extends Model {}

module.exports = (sequelize, DataTypes) => {
  User.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: { msg: "Email must be valid" },
        notEmpty: { msg: "Email is required" },
      },
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    user_gender: {
      type: DataTypes.ENUM('Female', 'Male', 'Other'),
      allowNull: false,
    },
    user_status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
    },
    join_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    designation_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
  });

  return User;
};
