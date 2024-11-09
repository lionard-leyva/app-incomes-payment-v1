import { Transaction } from '../../domain/entities/Transaction.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateTransaction {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(type, amount, description) {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('Invalid transaction type');
    }

    const transaction = new Transaction({
      id: uuidv4(),
      type,
      amount,
      description,
      date: new Date()
    });

    transaction.validate();
    return this.transactionRepository.create(transaction);
  }
}