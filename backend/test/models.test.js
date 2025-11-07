const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

describe('Transaction Model', () => {
  it('should create a valid transaction', () => {
    const validTransaction = {
      user: new mongoose.Types.ObjectId(),
      amount: 100,
      category: 'Food',
      description: 'Groceries',
      date: new Date(),
      type: 'expense'
    };

    const transaction = new Transaction(validTransaction);
    const error = transaction.validateSync();
    
    expect(error).toBeUndefined();
  });

  it('should fail without required fields', () => {
    const invalidTransaction = new Transaction({});
    const error = invalidTransaction.validateSync();
    
    expect(error).toBeDefined();
    expect(error.errors.user).toBeDefined();
    expect(error.errors.amount).toBeDefined();
    expect(error.errors.description).toBeDefined();
    expect(error.errors.category).toBeDefined();
    expect(error.errors.type).toBeDefined();
  });

  it('should fail with invalid type', () => {
    const invalidTransaction = new Transaction({
      user: new mongoose.Types.ObjectId(),
      amount: 100,
      category: 'Food',
      description: 'Test',
      type: 'invalid' // should be 'income' or 'expense'
    });
    
    const error = invalidTransaction.validateSync();
    expect(error).toBeDefined();
    expect(error.errors.type).toBeDefined();
  });
});
