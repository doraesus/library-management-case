const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/eligible-borrowers', async (req, res) => {
    try {
        const eligibleUsers = await userService.getEligibleBorrowers();
        res.status(200).json(eligibleUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const userWithBooks = await userService.getUserWithBooks(req.params.userId);
        res.status(200).json(userWithBooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:userId/borrow/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        await userService.borrowBook(userId, bookId);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

router.post('/:userId/return/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    try {
        await userService.returnBook(userId, bookId, score);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

router.get('/:userId/books', async (req, res) => {
    try {
        const userBooks = await userService.getUserBooks(req.params.userId);
        res.status(200).json(userBooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
