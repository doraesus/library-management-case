const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.create({ name });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
