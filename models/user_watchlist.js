"use strict";

module.exports = function(sequelize, DataTypes) {
  var user_watchlist = sequelize.define("user_watchlist", {
    userId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.user_watchlist.belongsTo(models.user)
      }
    }
  });

  return user_watchlist;
};
