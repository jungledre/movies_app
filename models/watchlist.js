"use strict";

module.exports = function(sequelize, DataTypes) {
  var watchlist = sequelize.define("watchlist", {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return watchlist;
};
