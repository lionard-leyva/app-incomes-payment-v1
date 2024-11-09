export class GetBalance {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute() {
    const transactions = await this.transactionRepository.findAll();
    
    return transactions.reduce((balance, transaction) => {
      return balance + (transaction.isIncome() ? transaction.amount : -transaction.amount);
    }, 0);
  }
}