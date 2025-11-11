
let expenses = []; // In-memory "database"
let nextId = 1;

const generateId = () => {
    const id = nextId.toString();
    nextId++;
    return id;
}

// Simplified CRUD operations (simulating database interactions)
module.exports = {
    findAll: () => expenses,
    findById: (id) => expenses.find(e => e.id === id),
    create: (expenseData) => {
        const newExpense = {
            id: generateId(),
            ...expenseData,
            date: new Date(expenseData.date || Date.now()).toISOString(),
        };
        expenses.push(newExpense);
        return newExpense;
    },
    update: (id, updateData) => {
        const index = expenses.findIndex(e => e.id === id);
        if (index === -1) return null;
        
        const updatedExpense = {
            ...expenses[index],
            ...updateData,
            id: expenses[index].id, 
            date: new Date(updateData.date || expenses[index].date).toISOString(), 
        };

        expenses[index] = updatedExpense;
        return updatedExpense;
    },
    remove: (id) => {
        const initialLength = expenses.length;
        expenses = expenses.filter(e => e.id !== id);
        return expenses.length < initialLength; // true if an item was removed
    }
};