const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Proper CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // frontend (Vite) URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ✅ Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Routes
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

// ✅ Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
