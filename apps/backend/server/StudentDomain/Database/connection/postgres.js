require('dotenv').config();

const {Client} = require('pg');
// test Postgres connection

const pool = new Client({
    connectionString: process.env.POSTGRES
})


module.exports = pool;