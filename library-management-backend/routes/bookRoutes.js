const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');

router.get('/', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const book = await bookService.getBookWithScore(req.params.bookId);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;
