const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL // Railway provides this automatically
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString,
    // SSL is usually required for Cloud DBs (Railway), but not for Local
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err);
    } else {
        console.log('✅ Database Connected Successfully');
    }
});

module.exports = pool;