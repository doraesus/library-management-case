const express = require('express');
const router = express.Router();
const booksRoutes = require('./booksRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/books', booksRoutes);
router.use('/users', usersRoutes);

module.exports = router;
