const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
const seedDatabase = require('./seeds');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = 3000;

(async function startServer() {
    try {
        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');

        await seedDatabase();
        console.log('Seed data added successfully.');

        app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
    } catch (err) {
        console.error('Error during server initialization:', err.message);
        process.exit(1);
    }
})();
