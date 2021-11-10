const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    price: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
});

module.exports = Product;

