'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {

      models.Like.belongsTo(models.Post,{
        as: 'post', 
        foreignKey: 'userId'
      });

    }
  };
  Like.init({
    postId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    associateId: {
      type: DataTypes.INTEGER
    },
    like: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};