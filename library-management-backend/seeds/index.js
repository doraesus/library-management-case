const seedUsers = require('./users');
const seedBooks = require('./books');
const seedBorrowedBooks = require('./borrowedBooks');

async function seedDatabase() {
    try {
        await seedUsers();
        console.log('Users seeded successfully.');
        
        await seedBooks();
        console.log('Books seeded successfully.');
        
        await seedBorrowedBooks();
        console.log('BorrowedBooks seeded successfully.');
    } catch (err) {
        console.error('Error during seeding:', err.message);
        throw err;
    }
}

module.exports = seedDatabase;
