const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PW
} = process.env;

const Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PW
});

module.exports = Client;