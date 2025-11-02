const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Example route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>TrackMySpend API</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; }
        .status { color: #16a34a; font-weight: bold; }
        .endpoint { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #2563eb; }
        .method { font-weight: bold; color: #dc2626; }
        code { background: #e5e7eb; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 TrackMySpend API</h1>
        <p class="status">✅ API is running successfully!</p>
        <p>Welcome to the TrackMySpend Personal Finance Manager API.</p>
        
        <h2>📋 Available Endpoints</h2>
        
        <div class="endpoint">
          <div class="method">POST</div>
          <strong>/api/auth/register</strong> - Register a new user
          <br><small>Body: { "email": "user@example.com", "password": "password" }</small>
        </div>
        
        <div class="endpoint">
          <div class="method">POST</div>
          <strong>/api/auth/login</strong> - Login user
          <br><small>Body: { "email": "user@example.com", "password": "password" }</small>
        </div>
        
        <div class="endpoint">
          <div class="method">GET</div>
          <strong>/api/transactions</strong> - Get user transactions
          <br><small>Requires: Authorization header with Bearer token</small>
        </div>
        
        <div class="endpoint">
          <div class="method">POST</div>
          <strong>/api/transactions</strong> - Create new transaction
          <br><small>Requires: Authorization header with Bearer token</small>
        </div>
        
        <div class="endpoint">
          <div class="method">GET</div>
          <strong>/api/budgets</strong> - Get user budgets
          <br><small>Requires: Authorization header with Bearer token</small>
        </div>
        
        <div class="endpoint">
          <div class="method">GET</div>
          <strong>/api/reminders</strong> - Get user reminders
          <br><small>Requires: Authorization header with Bearer token</small>
        </div>
        
        <h2>🔧 Configuration</h2>
        <p><strong>Port:</strong> ${process.env.PORT || 5000}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p><strong>MongoDB:</strong> ${process.env.MONGO_URI ? '✅ Connected' : '❌ Not configured'}</p>
        
        <h2>🌐 Frontend</h2>
        <p>Access the TrackMySpend web application at: <code>http://localhost:5173</code></p>
        
        <h2>📖 Documentation</h2>
        <p>For detailed API documentation and setup instructions, visit the project repository.</p>
      </div>
    </body>
    </html>
  `);
});

const transactionsRouter = require('./routes/transactions');
const budgetsRouter = require('./routes/budgets');
const remindersRouter = require('./routes/reminders');
const authRouter = require('./routes/auth');
const resetRoute = require('./routes/reset');
app.use('/api/transactions', transactionsRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/auth', authRouter);
app.use('/api/reset', resetRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));  