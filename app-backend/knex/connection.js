// This is needed in order to get the pg module bundled with webpack
// eslint-disable-next-line
const pg = require('pg');
// eslint-disable-next-line
const mysql = require('mysql');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.db',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    // pool: {
    // min: 2,
    // max: 6,
    // createTimeoutMillis: 3000,
    // acquireTimeoutMillis: 30000,
    // idleTimeoutMillis: 30000,
    // reapIntervalMillis: 1000,
    // createRetryIntervalMillis: 100,
    //   propagateCreateError: false, // <- default is true, set to false
    // },
  },
};
