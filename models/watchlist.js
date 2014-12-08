"use strict";

module.exports = function(sequelize, DataTypes) {
  var Watchlist = sequelize.define("Watchlist", {
    code: DataTypes.INTEGER,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Watchlist;
};
