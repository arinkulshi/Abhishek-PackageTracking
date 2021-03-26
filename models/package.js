const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const package = sequelize.define('package', {
  packgeID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  vendor: Sequelize.STRING,
  destinationAddress:  Sequelize.STRING,
  customerName:Sequelize.STRING,
  deliveryDate:Sequelize.DATE,
  
});

module.exports = OrderItem;
