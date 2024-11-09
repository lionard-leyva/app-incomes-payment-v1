import express from 'express';
import { SQLiteTransactionRepository } from './repositories/SQLiteTransactionRepository.js';
import { CreateTransaction } from '../../application/use-cases/CreateTransaction.js';
import { GetBalance } from '../../application/use-cases/GetBalance.js';

const router = express.Router();
const transactionRepository = new SQLiteTransactionRepository();
const createTransaction = new CreateTransaction(transactionRepository);
const getBalance = new GetBalance(transactionRepository);

router.post('/', async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const transaction = await createTransaction.execute(type, amount, description);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await transactionRepository.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const balance = await getBalance.execute();
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const transaction = await transactionRepository.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const updatedTransaction = await transactionRepository.update(req.params.id, {
      type,
      amount,
      description
    });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await transactionRepository.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export { router as transactionRouter };