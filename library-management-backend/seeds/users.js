const { User } = require('../models');

async function seedUsers() {
    await User.bulkCreate([
        { id: 1, name: 'Eray Aslan', score: 10, activeBorrowedBookId: null },
        { id: 2, name: 'Enes Faruk Meniz', score: 20, activeBorrowedBookId: 5 },
        { id: 3, name: 'Sefa Eren Şahin', score: 15, activeBorrowedBookId: null },
        { id: 4, name: 'Kadir Mutlu', score: 5, activeBorrowedBookId: null },
    ]);
}

module.exports = seedUsers;
