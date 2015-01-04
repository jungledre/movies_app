"use strict";

module.exports = function(sequelize, DataTypes) {
  var userwatchlist = sequelize.define("userwatchlist", {
    userId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.userwatchlist.hasMany(models.usercomment)
        models.userwatchlist.belongsTo(models.user)
      }
    }
  });

  return userwatchlist;
};
