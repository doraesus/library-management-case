const { Book } = require('../models');

async function seedBooks() {
    await Book.bulkCreate([
        { id: 1, name: "The Hitchhiker's Guide to the Galaxy", isBorrowed: false, averageScore: 10 },
        { id: 2, name: "I, Robot", isBorrowed: false, averageScore: 5.33 },
        { id: 3, name: "Dune", isBorrowed: false, averageScore: -1 },
        { id: 4, name: "1984", isBorrowed: false, averageScore: 7 },
        { id: 5, name: "Brave New World", isBorrowed: true, averageScore: 8 },
    ]);
}

module.exports = seedBooks;
