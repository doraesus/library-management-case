const User = require('../models/User');

async function findAll() {
    return await User.findAll();
}

async function create(data) {
    return await User.create(data);
}

module.exports = { findAll, create };
