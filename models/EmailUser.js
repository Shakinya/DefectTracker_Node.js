const { Model } = require('@sequelize/core');

class EmailUser extends Model {}

module.exports = (sequelize, DataTypes) => {
  EmailUser.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    defect_email_status: {
      type: DataTypes.BOOLEAN, // bit(1) -> BOOLEAN in Sequelize
      allowNull: true,
    },
    module_allocation_email_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    project_allocation_email_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    submodule_allocation_email_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'EmailUser',
    tableName: 'email_user',
    timestamps: false,
  });

  return EmailUser;
};
