import { TransactionRepository } from '../../domain/repositories/TransactionRepository.js';

export class InMemoryTransactionRepository extends TransactionRepository {
  constructor() {
    super();
    this.transactions = new Map();
  }

  async create(transaction) {
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  async findById(id) {
    const transaction = this.transactions.get(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async findAll() {
    return Array.from(this.transactions.values());
  }

  async update(id, updatedTransaction) {
    if (!this.transactions.has(id)) {
      throw new Error('Transaction not found');
    }
    this.transactions.set(id, { ...updatedTransaction, id });
    return this.transactions.get(id);
  }

  async delete(id) {
    if (!this.transactions.has(id)) {
      throw new Error('Transaction not found');
    }
    this.transactions.delete(id);
  }
}