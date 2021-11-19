'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {

      models.User.belongsToMany(models.Post, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'postId',
      });
  
      models.Post.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'postId',
        otherKey: 'userId',
      });
  
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });

    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};