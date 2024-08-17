const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'methree',
    password: 'password3',
    host: 'localhost',
    port: 5432,
    database: 'authtodo'
});

module.exports = pool;
