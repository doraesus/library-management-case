const { BorrowedBook } = require('../models');

async function seedBorrowedBooks() {
    await BorrowedBook.bulkCreate([
        // Kullanıcı 2 geçmiş kitaplar
        { UserId: 2, BookId: 2, borrowDate: new Date('2024-01-01'), returnDate: new Date('2024-01-05'), score: 5 }, // I, Robot
        { UserId: 2, BookId: 1, borrowDate: new Date('2024-01-06'), returnDate: new Date('2024-01-10'), score: 10 }, // The Hitchhiker's Guide to the Galaxy

        // Kullanıcı 2 aktif kitap
        { UserId: 2, BookId: 5, borrowDate: new Date('2024-01-15'), returnDate: null, score: null }, // Brave New World

        // I, Robot için eklenen borçlanma kayıtları
        { UserId: 3, BookId: 2, borrowDate: new Date('2024-01-12'), returnDate: new Date('2024-01-16'), score: 5 }, // Sefa Eren Şahin
        { UserId: 1, BookId: 2, borrowDate: new Date('2024-01-20'), returnDate: new Date('2024-01-25'), score: 6 }, // Eray Aslan

        // Kullanıcı 1 aktif kitap yok
    ]);
}

module.exports = seedBorrowedBooks;
