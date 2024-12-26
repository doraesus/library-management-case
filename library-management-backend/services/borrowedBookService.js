const borrowedBookRepository = require('../repositories/borrowedBookRepository');
const { findAllUsers: getAll } = require('../repositories/userRepository');

const borrowedBookService = {
    async createBorrowedBook(userId, bookId) {
        return await borrowedBookRepository.createBorrowedBook(userId, bookId);
    },
    
    async getAllPastBorrowedBooksOfUser(userId) {
        return await borrowedBookRepository.findAllBorrowedBooksOfUser(userId);
    },
    
    async getActiveBorrowedBookOfUser(userId, bookId) {
        return await borrowedBookRepository.findActiveBorrowedBookOfUser(userId, bookId);
    },

    async getActiveBorrowRecordOfBook(bookId) {
        return await borrowedBookRepository.findBookIsCurrentlyBorrowed(bookId);
    },

    async getAllScoresForBook(bookId) {
        return await borrowedBookRepository.findAllScoresForBook(bookId);
    },
    
    async calculateAndGetBookAverageScore(bookId) {
        const scores = await borrowedBookRepository.findAllScoresForBook(bookId);
        if (scores.length === 0) return -1;
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        return totalScore / scores.length;
    },
    
    async updateReturnDateAndScore(borrowedBookId, score) {
        return await borrowedBookRepository.updateReturnDateAndScore(borrowedBookId, score);
    }
}

module.exports = borrowedBookService;