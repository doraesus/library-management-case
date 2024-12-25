const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Book = require('./Book');
const BorrowedBook = require('./BorrowedBook');

User.hasMany(BorrowedBook, { foreignKey: 'UserId' });
Book.hasMany(BorrowedBook, { foreignKey: 'BookId' });
BorrowedBook.belongsTo(User, { foreignKey: 'UserId' });
BorrowedBook.belongsTo(Book, { foreignKey: 'BookId' });

module.exports = {
    sequelize,
    User,
    Book,
    BorrowedBook,
};