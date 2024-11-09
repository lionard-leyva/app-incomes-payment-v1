import { db } from './database.js';

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      type TEXT CHECK (type IN ('INCOME', 'EXPENSE')),
      amount REAL CHECK (amount > 0),
      description TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log('Tables created successfully');
}

createTables();