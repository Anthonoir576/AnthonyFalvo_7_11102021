'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {

      models.Post.hasMany(models.Comment, {
        foreignKey: {
          as: 'Comments',
          foreignKey: 'postId'
        }
      });
      models.Post.hasMany(models.Like, {
        foreignKey: {
          as: 'Likes',
          foreignKey: 'userId'
        }
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    username: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};