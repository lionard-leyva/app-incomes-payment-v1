import { TransactionRepository } from '../../domain/repositories/TransactionRepository.js';
import { Transaction } from '../../domain/entities/Transaction.js';
import { pool } from '../db/database.js';

export class PostgresTransactionRepository extends TransactionRepository {
  async create(transaction) {
    const query = `
      INSERT INTO transactions (id, type, amount, description, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      transaction.id,
      transaction.type,
      transaction.amount,
      transaction.description,
      transaction.date
    ];

    const result = await pool.query(query, values);
    return this.mapToTransaction(result.rows[0]);
  }

  async findById(id) {
    const query = 'SELECT * FROM transactions WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('Transaction not found');
    }

    return this.mapToTransaction(result.rows[0]);
  }

  async findAll() {
    const query = 'SELECT * FROM transactions ORDER BY date DESC';
    const result = await pool.query(query);
    return result.rows.map(row => this.mapToTransaction(row));
  }

  async update(id, transaction) {
    const query = `
      UPDATE transactions 
      SET type = $1, amount = $2, description = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [transaction.type, transaction.amount, transaction.description, id];
    
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Transaction not found');
    }

    return this.mapToTransaction(result.rows[0]);
  }

  async delete(id) {
    const query = 'DELETE FROM transactions WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Transaction not found');
    }
  }

  mapToTransaction(row) {
    return new Transaction(
      row.id,
      row.type,
      parseFloat(row.amount),
      row.description,
      new Date(row.date)
    );
  }
}