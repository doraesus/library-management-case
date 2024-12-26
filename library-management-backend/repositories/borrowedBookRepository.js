const BorrowedBook = require('../models/BorrowedBook');
const Book = require('../models/Book');
const User = require('../models/User');
const { Op } = require('sequelize');

const borrowedBookRepository = {

    async createBorrowedBook(userId, bookId) {
        return await BorrowedBook.create({
            UserId: userId,
            BookId: bookId,
        });
    },

    async findActiveBorrowedBookOfUser(userId, bookId) {
        return await BorrowedBook.findOne({
            where: {
                UserId: userId,
                BookId: bookId,
                returnDate: { [Op.is]: null },
            },
        });
    },

    async findBookIsCurrentlyBorrowed(bookId) {
        return await BorrowedBook.findOne({
            where: {
                BookId: bookId,
                returnDate: { [Op.is]: null },
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                }
            ],
        });
    },

    async findAllBorrowedBooksOfUser(userId) {
        return await BorrowedBook.findAll({
            where: {
                UserId: userId,
                returnDate: { [Op.ne]: null },
            },
            include: [
                {
                    model: Book,
                    attributes: ['name'],
                },
            ],
        });
    },

    async updateReturnDateAndScore(borrowedBookId, score) {
        const borrowedBook = await BorrowedBook.findByPk(borrowedBookId);
        if (!borrowedBook) {
            throw new Error(`Borrowed book with ID ${borrowedBookId} not found`);
        }
        borrowedBook.returnDate = new Date();
        if (score) borrowedBook.score = score;
        await borrowedBook.save();
        return borrowedBook;
    },

    async findAllScoresForBook(bookId) {
        const borrowedBooks = await BorrowedBook.findAll({
            where: {
                BookId: bookId,
                score: { [Op.ne]: null },
            },
            attributes: ['score'],
        });
        return borrowedBooks.map(record => record.score);
    },
};

module.exports = borrowedBookRepository;