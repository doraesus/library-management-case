const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isBorrowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    averageScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

module.exports = Book;