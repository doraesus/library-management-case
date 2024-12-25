const Book = require('../models/Book');

const bookRepository = {

    async findAllBooks() {
        return await Book.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
    },

    async findById(bookId) {
        return await Book.findByPk(bookId);
    },

    async updateBorrowedStatus(bookId, isBorrowed) {
        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error(`Book with ID ${bookId} not found`);
        }
        book.isBorrowed = isBorrowed;
        await book.save();
        return book;
    },

    async updateAverageScore(bookId, averageScore) {
        const book = await Book.findByPk(bookId);
        if (!book) {
            throw new Error(`Book with ID ${bookId} not found`);
        }
        book.averageScore = averageScore;
        await book.save();
        return book;
    },
};

module.exports = bookRepository;