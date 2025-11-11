// expense-tracker-ui/src/components/ExpenseForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Paper, 
    Typography, 
    Grid, 
    Alert 
} from '@mui/material';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '', 
        category: '',
        user_id: 'user_12345' 
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null); // success or error message
    const [messageSeverity, setMessageSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        if (!formData.description || !formData.amount || !formData.category) {
            setMessage("Please fill in all required fields.");
            setMessageSeverity('warning');
            setIsSubmitting(false);
            return;
        }

        const expensePayload = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        try {
            const response = await axios.post('/api/v1/expenses', expensePayload);
            setMessage(`Expense "${response.data.description}" recorded successfully!`);
            setMessageSeverity('success');
            setFormData({ description: '', amount: '', category: '', user_id: 'user_12345' });
            if (onExpenseAdded) {
                onExpenseAdded(response.data);
            }

        } catch (error) {
            console.error("Error creating expense:", error);
            const errorMessage = error.response?.data?.message || "Could not connect to the microservice or a server error occurred.";
            setMessage(errorMessage);
            setMessageSeverity('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Paper elevation={4} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Add New Expense
            </Typography>
            
            {message && (
                <Alert severity={messageSeverity} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description (e.g., Groceries, Coffee)"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Amount ($)"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Category (e.g., Food, Travel, Rent)"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Record Expense'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ExpenseForm;