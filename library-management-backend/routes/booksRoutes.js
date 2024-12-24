const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');

router.get('/', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
