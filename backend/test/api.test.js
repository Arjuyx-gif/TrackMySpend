const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Mock app setup
const app = express();
app.use(express.json());

describe('API Health Check', () => {
  it('should return 200 for health check', async () => {
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });

    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

describe('Transaction Routes', () => {
  beforeAll(() => {
    // Mock transaction route
    app.get('/api/transactions', (req, res) => {
      res.status(200).json([
        { id: 1, amount: 100, category: 'Food', date: '2024-01-01' }
      ]);
    });
  });

  it('should get all transactions', async () => {
    const response = await request(app).get('/api/transactions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
