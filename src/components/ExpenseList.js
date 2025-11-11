
import { List, ListItem, ListItemText, Paper, Alert, Typography,IconButton, Tooltip,Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {

    if (expenses.length === 0) {
        return <Alert severity="info">No expenses recorded yet. Time to add one!</Alert>;
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <List>
                {expenses.map((expense) => (
                    <ListItem 
                        key={expense.id} 
                        divider
                        secondaryAction={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                
                                <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                                    ${expense.amount.toFixed(2)}
                                </Typography>
                                <Tooltip title="Edit Expense">
                                    <IconButton 
                                        edge="end" 
                                        aria-label="edit"
                                        color="info" 
                                        onClick={() => onEdit(expense)} 
                                        sx={{ mr: 1 }} 
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Delete Expense">
                                    <IconButton 
                                        edge="end" 
                                        aria-label="delete"
                                        onClick={() => onDelete(expense.id)} 
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        }
                    >
                        <ListItemText 
                            primary={expense.description}
                            secondary={`Category: ${expense.category} | Date: ${new Date(expense.date).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ExpenseList;