const config = require('../utils/config');
const Sequelize = require('sequelize');
const phoneBookModel = require('./model/phoneBook');

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host_address,
    dialect: 'postgres',
    port: config.database.port,
    dialectOptions: {
        requestTimeout: 3000
    },
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// check connection establishment
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const phoneBook = phoneBookModel(sequelize, Sequelize);

// For convenience I am adding the tables from the code.
// This is not acceptable in production environment.
sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`);
    });

module.exports = {
    phoneBook
};