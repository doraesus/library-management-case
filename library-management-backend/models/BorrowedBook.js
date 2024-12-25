const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const BorrowedBook = sequelize.define('BorrowedBook', {
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
});

BorrowedBook.belongsTo(User);
BorrowedBook.belongsTo(Book);

module.exports = BorrowedBook;
