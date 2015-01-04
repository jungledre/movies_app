"use strict";

module.exports = function(sequelize, DataTypes) {
  var usercomment = sequelize.define("usercomment", {
    text: DataTypes.STRING,
    userwatchlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.usercomment.belongsTo(models.userwatchlist)
      }
    }
  });

  return usercomment;
};
