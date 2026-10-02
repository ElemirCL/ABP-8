const { Pool } = require('pg');//importando modulo pg 
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Client conectado a PostgreSQL');
});

pool.on('error', (error) => {
    console.error('Error inesperado en pool: ', error.code, error.message);
});

module.exports = pool;