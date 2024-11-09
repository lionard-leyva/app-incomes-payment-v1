import { TransactionRepository } from '../../domain/repositories/TransactionRepository.js';
import { Transaction } from '../../domain/entities/Transaction.js';
import { db } from '../db/database.js';

export class SQLiteTransactionRepository extends TransactionRepository {
  async create(transaction) {
    const stmt = db.prepare(`
      INSERT INTO transactions (id, type, amount, description, date)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      transaction.id,
      transaction.type,
      transaction.amount,
      transaction.description,
      transaction.date.toISOString()
    );

    return transaction;
  }

  async findById(id) {
    const stmt = db.prepare('SELECT * FROM transactions WHERE id = ?');
    const row = stmt.get(id);

    if (!row) {
      throw new Error('Transaction not found');
    }

    return this.mapToTransaction(row);
  }

  async findAll() {
    const stmt = db.prepare('SELECT * FROM transactions ORDER BY date DESC');
    const rows = stmt.all();
    return rows.map(row => this.mapToTransaction(row));
  }

  async update(id, transaction) {
    const stmt = db.prepare(`
      UPDATE transactions 
      SET type = ?, amount = ?, description = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(transaction.type, transaction.amount, transaction.description, id);
    
    if (result.changes === 0) {
      throw new Error('Transaction not found');
    }

    return this.findById(id);
  }

  async delete(id) {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
      throw new Error('Transaction not found');
    }
  }

  mapToTransaction(row) {
    return new Transaction({
      id: row.id,
      type: row.type,
      amount: row.amount,
      description: row.description,
      date: new Date(row.date)
    });
  }
}