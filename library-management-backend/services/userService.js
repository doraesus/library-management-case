const userRepository = require('../repositories/userRepository');
const bookService = require('./bookService');
const borrowedBookService = require('./borrowedBookService');

const userService = {

    async createUser(data) {
        return await userRepository.create(data);
    },
    
    async getAllUsers() {
        return await userRepository.findAllUsers();
    },

    async getUserById(userId) {
        return await userRepository.findUserById(userId);
    },
    
    async getUserWithBooks(userId) {
        const userInfo = await userRepository.findUserById(userId);
        if (!userInfo) {
            throw new Error(`User with ID ${userId} not found`);
        }
    
        const pastBooksRaw = await borrowedBookService.getAllPastBorrowedBooksOfUser(userId);
        const pastBooks = pastBooksRaw.map((borrowedBook) => ({
            name: borrowedBook.Book.name,
            userScore: borrowedBook.score,
        }));
    
        const presentBook = userInfo.activeBorrowedBookId
            ? await bookService.getBookById(userInfo.activeBorrowedBookId)
            : null;
    
        return {
            id: userInfo.id,
            name: userInfo.name,
            books: {
                past: pastBooks,
                present: presentBook ? [{ name: presentBook.title || presentBook.name }] : [],
            },
        };
    },
    
    async borrowBook(userId, bookId) {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
    
        if (user.activeBorrowedBookId) {
            throw new Error('User has already borrowed a book');
        }
    
        const book = await bookService.getBookById(bookId);
        if (!book || book.isBorrowed) {
            throw new Error('Book is not available for borrowing');
        }
    
        await borrowedBookService.createBorrowedBook(userId, bookId);
        await bookService.updateBookStatus(bookId, true);
        await userRepository.update(userId, { activeBorrowedBookId: bookId });
    },
    
    
    async returnBook(userId, bookId, score) {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.activeBorrowedBookId !== parseInt(bookId)) {
            throw new Error('User did not borrow this book');
        }

        const borrowedBook = await borrowedBookService.getActiveBorrowedBookOfUser(userId, bookId);
        if (!borrowedBook) {
            throw new Error('No active borrowed book found');
        }

        await borrowedBookService.updateReturnDateAndScore(borrowedBook.id, score);
    
        const newAverageScore = await borrowedBookService.calculateAndGetBookAverageScore(bookId);
        await bookService.updateBookStatus(bookId, false);
        await bookService.updateBookAverageScore(bookId, newAverageScore);
    
        await userRepository.update(userId, { activeBorrowedBookId: null });
        await userRepository.incrementUserScore(userId, 5);
    },

    async getUserBooks(userId) {
        const userInfo = await userRepository.findUserById(userId);
        if (!userInfo) {
            throw new Error(`User with ID ${userId} not found`);
        }
    
        const pastBooksRaw = await borrowedBookService.getAllPastBorrowedBooksOfUser(userId);
        const pastBooks = pastBooksRaw.map((borrowedBook) => ({
            id: borrowedBook.Book.id,
            name: borrowedBook.Book.name,
            userScore: borrowedBook.score,
        }));
    
        const presentBook = userInfo.activeBorrowedBookId
            ? await bookService.getBookById(userInfo.activeBorrowedBookId)
            : null;
    
        return {
            id: userInfo.id,
            name: userInfo.name,
            books: {
                past: pastBooks,
                present: presentBook
                    ? [{ id: presentBook.id, name: presentBook.title || presentBook.name }]
                    : [],
            },
        };
    },

    async getEligibleBorrowers() {
        return await userRepository.findEligibleBorrowers();
    },

    
}

module.exports = userService;