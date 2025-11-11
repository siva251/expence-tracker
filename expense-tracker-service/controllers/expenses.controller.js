
const ExpenseModel = require('../models/expense.model');

// --- Input Validation Utility ---
const validateExpenseInput = (expense) => {
    if (!expense.description || typeof expense.description !== 'string' || expense.description.length < 3) {
        return "Description is required and must be at least 3 characters long.";
    }
    if (!expense.amount || typeof expense.amount !== 'number' || expense.amount <= 0) {
        return "Amount is required and must be a positive number.";
    }
    if (!expense.category || typeof expense.category !== 'string') {
        return "Category is required.";
    }
    // Simple check for user_id (optional for now, but good practice)
    if (!expense.user_id) {
        return "User ID is required for ownership tracking.";
    }
    return null; // Null means valid
};


// POST /api/v1/expenses (Create)
exports.createExpense = (req, res, next) => {
    const validationError = validateExpenseInput(req.body);

    if (validationError) {
        // Input validation error handling
        return res.status(400).json({ error: true, message: validationError });
    }

    try {
        const newExpense = ExpenseModel.create(req.body);
        // Successful creation returns 201 Created
        res.status(201).json(newExpense);
    } catch (error) {
        next(error); // Pass to general error handler
    }
};

// GET /api/v1/expenses (Retrieve All)
exports.getAllExpenses = (req, res, next) => {
    try {
        const expenses = ExpenseModel.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        next(error);
    }
};

// PUT /api/v1/expenses/:id (Update)
exports.updateExpense = (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Minimal update validation
    if (Object.keys(updateData).length === 0) {
         return res.status(400).json({ error: true, message: "No fields provided for update." });
    }

    try {
        const updatedExpense = ExpenseModel.update(id, updateData);

        if (!updatedExpense) {
            // Resource not found error handling
            return res.status(404).json({ error: true, message: `Expense with ID ${id} not found.` });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/v1/expenses/:id (Delete)
exports.deleteExpense = (req, res, next) => {
    const { id } = req.params;
    try {
        const wasDeleted = ExpenseModel.remove(id);

        if (!wasDeleted) {
            // Resource not found error handling
            return res.status(404).json({ error: true, message: `Expense with ID ${id} not found.` });
        }
        // Successful deletion returns 204 No Content
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
};