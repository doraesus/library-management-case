const Book = require('../models/Book');

async function getAllBooks() {
    return await Book.findAll();
}

async function createBook(bookData) {
    return await Book.create(bookData);
}

module.exports = { getAllBooks, createBook };