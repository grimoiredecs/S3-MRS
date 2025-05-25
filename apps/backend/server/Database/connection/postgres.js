require('dotenv').config();

const {Client} = require('pg');
const client = new Client({})
// test Postgres connection

const pool = new Client({
    connectionString: process.env.POSTGRES
})


module.exports = pool;