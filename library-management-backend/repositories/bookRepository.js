const Book = require('../models/Book');

async function findAll() {
    return await Book.findAll();
}

async function create(data) {
    return await Book.create(data);
}

module.exports = { findAll, create };
