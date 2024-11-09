import Database from 'better-sqlite3';

const db = new Database('finance.db', { verbose: console.log });

export { db };