
const express = require('express');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenses.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1', expenseRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Expense Tracker Microservice is running!',
        status: 'Headless & API-First'
    });
});

// --- General Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message || 'An unexpected server error occurred.'
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Expense Tracker Service listening on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = app;