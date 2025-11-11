const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Expense Tracker API', () => {
  
  // 🩺 Health Check Test
  it('GET / → should return health check response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Expense Tracker Microservice is running!');
    expect(res.body).toHaveProperty('status', 'Headless & API-First');
  });

  // 🧪 Validation Test: Missing Body
  it('POST /api/v1/expenses → should handle missing request body gracefully', async () => {
    const res = await request(app)
      .post('/api/v1/expenses')
      .send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error', true);
  });

  // ✅ Create Expense (Success)
  it('POST /api/v1/expenses → should create a new expense', async () => {
    const res = await request(app)
      .post('/api/v1/expenses')
      .send({
        description: "Groceries",
        amount: 200,
        category: "Food",
        user_id: "user123"
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.description).toBe('Groceries');
  });

  // 📋 Get All Expenses
  it('GET /api/v1/expenses → should return an array of expenses', async () => {
    const res = await request(app).get('/api/v1/expenses');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✏️ Update Expense
  it('PUT /api/v1/expenses/:id → should update an existing expense', async () => {
    // First create a new expense
    const createRes = await request(app)
      .post('/api/v1/expenses')
      .send({
        description: "Internet Bill",
        amount: 500,
        category: "Utilities",
        user_id: "user001"
      });

    const expenseId = createRes.body.id;

    // Now update the expense
    const updateRes = await request(app)
      .put(`/api/v1/expenses/${expenseId}`)
      .send({ amount: 600 });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.amount).toBe(600);
  });

  // 🧨 Update Expense (Invalid ID)
  it('PUT /api/v1/expenses/:id → should return 404 for non-existent expense', async () => {
    const res = await request(app)
      .put('/api/v1/expenses/9999')
      .send({ amount: 100 });
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

  // 🗑️ Delete Expense
  it('DELETE /api/v1/expenses/:id → should delete an existing expense', async () => {
    // Create an expense first
    const createRes = await request(app)
      .post('/api/v1/expenses')
      .send({
        description: "Test Expense",
        amount: 100,
        category: "Misc",
        user_id: "user123"
      });

    const id = createRes.body.id;

    // Delete it
    const deleteRes = await request(app).delete(`/api/v1/expenses/${id}`);
    expect(deleteRes.statusCode).toBe(204);
  });

  // ❌ Delete Expense (Invalid ID)
  it('DELETE /api/v1/expenses/:id → should return 404 for non-existent expense', async () => {
    const res = await request(app).delete('/api/v1/expenses/invalid123');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

});
