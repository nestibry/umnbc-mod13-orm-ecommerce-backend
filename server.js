const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

// Sync sequelize models to the database then turn on the server
// Do not sync if in a production environment
const okToSync = (process.env.NODE_ENV === 'prod') ? false : true;
sequelize.sync({force: okToSync}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
});