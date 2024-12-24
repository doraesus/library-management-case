const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, author, year } = req.body;
        const book = await Book.create({ name, author, year });
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
