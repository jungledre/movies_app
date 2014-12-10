"use strict";

module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    text: DataTypes.STRING,
    watchlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.watchlist)
      }
    }
  });

  return comment;
};
