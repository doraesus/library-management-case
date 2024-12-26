const bookRepository = require('../repositories/bookRepository');
const borrowedBookService = require('./borrowedBookService');

const bookService = {

    async getAllBooks() {
        return await bookRepository.findAllBooks();
    },
    
    async updateBookStatus(bookId, isBorrowed) {
        await bookRepository.updateBorrowedStatus(bookId, isBorrowed);
    },
    
    async updateBookAverageScore(bookId, averageScore) {
        await bookRepository.updateAverageScore(bookId, averageScore);
    },
    
    async getBookById(bookId) {
        return await bookRepository.findById(bookId);
    },
    
    async getBookWithScore(bookId) {
        const book = await bookRepository.findById(bookId);
        if (!book) {
            throw new Error(`Book with ID ${bookId} not found`);
        }
    
        const scores = await borrowedBookService.getAllScoresForBook(bookId);
        const averageScore = scores.length > 0 
            ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2) 
            : -1;
    
        return {
            id: book.id,
            name: book.name,
            score: averageScore,
        };
    },

    async getBookWithBorrower(bookId) {
        const book = await bookRepository.findById(bookId);
        if (!book) {
            throw new Error(`Book with ID ${bookId} not found`);
        }

        if (!book.isBorrowed) {
            return {
                id: book.id,
                name: book.name,
                score: book.averageScore,
                isBorrowed: false,
            };
        }

        const borrowedBook = await borrowedBookService.getActiveBorrowRecordOfBook(bookId);
        if (!borrowedBook) {
            throw new Error(`Book is not borrowed`);
        }

        return {
            id: book.id,
            name: book.name,
            score: book.averageScore,
            isBorrowed: true,
            borrowerInfo: {
                userId: borrowedBook.User.id,
                userName: borrowedBook.User.name,
            },
        };
    },
}

module.exports = bookService;