

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Modal, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Alert,
    CircularProgress 
} from '@mui/material';

// Styling for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

// Component accepts props to manage state and success handling
const EditExpenseModal = ({ open, handleClose, expenseToEdit, onExpenseUpdated }) => {
    
    // State to hold the data currently being edited
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effect to populate the form whenever a new expenseToEdit is passed
    useEffect(() => {
        if (expenseToEdit) {
            setFormData({
                description: expenseToEdit.description,
                amount: expenseToEdit.amount.toString(), 
                category: expenseToEdit.category,
                user_id: expenseToEdit.user_id 
            });
            setError(null);
        }
    }, [expenseToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const expensePayload = {
            ...formData,
            amount: parseFloat(formData.amount), // Convert back to number for the API
        };
        
        try {
            const response = await axios.put(`/api/v1/expenses/${expenseToEdit.id}`, expensePayload);
            onExpenseUpdated(response.data);
            handleClose();

        } catch (err) {
            console.error("Error updating expense:", err);
            const errorMessage = err.response?.data?.message || "Failed to update expense. Check network connection.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!expenseToEdit) return null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-expense-title"
        >
            <Box sx={style}>
                <Typography id="edit-expense-title" variant="h6" component="h2" gutterBottom>
                    Edit Expense: {expenseToEdit.id}
                </Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description || ''}
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
                                value={formData.amount || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Category"
                                name="category"
                                value={formData.category || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button onClick={handleClose} variant="outlined" disabled={loading}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default EditExpenseModal;