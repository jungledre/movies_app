"use strict";

module.exports = function(sequelize, DataTypes) {
  var watchlist = sequelize.define("watchlist", {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.watchlist.hasMany(models.comment)
      }
    }
  });

  return watchlist;
};
