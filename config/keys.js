require('dotenv').config()
const { dbPassword } = process.env;

module.exports = {
    mongoURI: process.env.dbPassword
};
