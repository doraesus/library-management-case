const User = require('../models/User');

const userRepository = {

    async findAllUsers() {
        return await User.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']],
        });
    },

    async findUserById(userId) {
        return await User.findByPk(userId);
    },

    async update(userId, updateFields) {
        return await User.update(updateFields, { where: { id: userId } });
    },

    async incrementUserScore(userId, incrementBy) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        user.score += incrementBy;
        await user.save();
        return user;
    },
};

module.exports = userRepository;
