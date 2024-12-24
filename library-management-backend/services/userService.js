const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
    return await userRepository.findAll();
}

async function createUser(userData) {
    if (!userData.name) {
        throw new Error('Name is required');
    }
    return await userRepository.create(userData);
}

module.exports = { getAllUsers, createUser };
