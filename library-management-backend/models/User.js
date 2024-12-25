const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    activeBorrowedBookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = User;
