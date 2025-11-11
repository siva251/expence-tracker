// expense-tracker-ui/src/App.jsx

import { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';
import { 
    Container, 
    Typography, 
    AppBar, 
    Toolbar, 
    CircularProgress, 
    Alert 
} from '@mui/material';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm'; 
import EditExpenseModal from './components/EditExpenseModal';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const fetchExpenses = useCallback(() => {
    setLoading(true);
    setError(null);
    axios.get('/api/v1/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(err => {
        console.error("Error fetching expenses:", err);
        setError("Failed to load expenses. Is the backend running on port 3000?");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]); 
  const handleExpenseAdded = (newExpense) => {
    
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    const originalExpenses = expenses;
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));

    try {
      
      await axios.delete(`/api/v1/expenses/${id}`);
      console.log(`Expense ${id} deleted successfully.`);
      
    } catch (error) {
      console.error(`Error deleting expense ${id}:`, error);
      setExpenses(originalExpenses);
      alert("Failed to delete expense. Please check the backend log.");
    }
  };

  const handleEditOpen = (expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };

  const handleEditClose = () => {
    setIsModalOpen(false);
    setExpenseToEdit(null);
  };
  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(exp => 
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    handleEditClose(); 
  };


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Expense Tracker (Headless Client)
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Expenses Dashboard
        </Typography>
        <ExpenseForm onExpenseAdded={handleExpenseAdded} /> 
        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditOpen}/>}
      </Container>
      <EditExpenseModal
        open={isModalOpen}
        handleClose={handleEditClose}
        expenseToEdit={expenseToEdit}
        onExpenseUpdated={handleExpenseUpdated}
      />
    </>
  );
}

export default App;