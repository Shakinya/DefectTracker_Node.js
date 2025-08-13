const { Model } = require('@sequelize/core');

class Comment extends Model {}

module.exports = (sequelize, DataTypes) => {
  Comment.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    attachment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    defect_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false,
  });

  return Comment;
};
