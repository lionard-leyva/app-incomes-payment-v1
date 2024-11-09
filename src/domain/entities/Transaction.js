export class Transaction {
  constructor({ id, type, amount, description, date }) {
    this.id = id;
    this.type = type; // 'INCOME' or 'EXPENSE'
    this.amount = amount;
    this.description = description;
    this.date = date || new Date();
  }

  validate() {
    if (!['INCOME', 'EXPENSE'].includes(this.type)) {
      throw new Error('Invalid transaction type');
    }
    if (typeof this.amount !== 'number' || this.amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!this.description || typeof this.description !== 'string') {
      throw new Error('Description is required');
    }
  }
}