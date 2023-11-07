const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

// Sync sequelize models to the database then turn on the server
// Do not sync if in a production environment
// const okToSync = (process.env.NODE_ENV === 'prod') ? false : true;
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
});