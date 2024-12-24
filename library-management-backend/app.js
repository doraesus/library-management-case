const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
const { Book } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

const PORT = 3000;
sequelize.sync({ force: true }).then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => console.log(`Server started on ${PORT} port.`));
}).catch((err) => {
    console.error('Error during synchronization:', err.message);
});
