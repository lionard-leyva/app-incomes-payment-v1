import { CreateTransaction } from '../application/use-cases/CreateTransaction.js';
import { InMemoryTransactionRepository } from '../infrastructure/repositories/InMemoryTransactionRepository.js';

describe('CreateTransaction', () => {
  let createTransaction;
  let transactionRepository;

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    createTransaction = new CreateTransaction(transactionRepository);
  });

  test('should create an income transaction', async () => {
    const transaction = await createTransaction.execute('INCOME', 100, 'Salary');
    expect(transaction.type).toBe('INCOME');
    expect(transaction.amount).toBe(100);
    expect(transaction.description).toBe('Salary');
  });

  test('should create an expense transaction', async () => {
    const transaction = await createTransaction.execute('EXPENSE', 50, 'Groceries');
    expect(transaction.type).toBe('EXPENSE');
    expect(transaction.amount).toBe(50);
    expect(transaction.description).toBe('Groceries');
  });

  test('should throw error for invalid amount', async () => {
    await expect(
      createTransaction.execute('INCOME', -100, 'Invalid')
    ).rejects.toThrow('Amount must be greater than 0');
  });

  test('should throw error for invalid type', async () => {
    await expect(
      createTransaction.execute('INVALID', 100, 'Invalid')
    ).rejects.toThrow('Invalid transaction type');
  });
});