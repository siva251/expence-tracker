# CCEP MACH Microservice Exercise



## Candidate Name

**Candidate Name:**SIVA KUMAR B

# 💰 Expense Tracker — Full Stack (React + Node.js + Express)

A full-stack **Expense Tracking Application** built using **React (frontend)** and **Node.js/Express (backend)**.  
This project follows an **API-first, headless architecture**, where the backend exposes REST APIs consumed by the React client.

---

## 🚀 Features

- Add, edit, delete, and view expenses.
- RESTful API (CRUD operations).
- Input validation and error handling.
- In-memory database for simplicity (can be extended to MongoDB/MySQL easily).
- Modern UI using **Material-UI (MUI)**.
- Modular structure — Controllers, Routes, Models separated.
- Unit testing with **Jest** and **Supertest**.
- Environment variable support using `.env`.

---

## 🗂️ Folder Structure

```
ccep-technical-exercise/
│
├── src/
│ ├── components/ # Reusable UI Components
│ │ ├── ExpenseForm.jsx
│ │ ├── ExpenseList.jsx
│ │ └── EditExpenseModal.jsx
│ ├── App.jsx # Main App Component
│ └── index.js
└── package.json
│
├── expense-tracker-service/ # Node.js Backend
│ ├── controllers/ # Business logic layer
│ │ └── expenses.controller.js
│ ├── models/ # In-memory data model
│ │ └── expense.model.js
│ ├── routes/ # Express routes
│ │ └── expenses.routes.js
│ ├── tests/ # Unit and integration tests
│ │ └── expenses.test.js
│ ├── server.js # Main server entry point
│ ├── .env
│ ├── package.json
│ └── README.md
│
└── README.md # Project root documentation
```

---

## 🧠 Tech Stack

### **Frontend**
- React.js (Hooks)
- Material-UI (MUI)
- Axios

### **Backend**
- Node.js
- Express.js
- dotenv (for environment variables)
- Jest + Supertest (for testing)

---

## ⚙️ API Endpoints Documentation

| HTTP Method | Endpoint | Description | Request Body | Success Response | Status Codes |
|--------------|-----------|--------------|---------------|------------------|---------------|
| **POST** | `/api/v1/expenses` | Create a new expense | `{ "description": "Lunch", "amount": 200, "category": "Food", "user_id": "u123" }` | Returns created expense | 201 (Created), 400 (Validation Error) |
| **GET** | `/api/v1/expenses` | Retrieve all expenses | — | Returns array of expenses | 200 (OK) |
| **PUT** | `/api/v1/expenses/:id` | Update an existing expense | `{ "amount": 250 }` | Returns updated expense | 200 (OK), 400 (Bad Request), 404 (Not Found) |
| **DELETE** | `/api/v1/expenses/:id` | Delete an expense | — | No content | 204 (No Content), 404 (Not Found) |
| **GET** | `/` | Health check endpoint | — | `{ message: "Expense Tracker Microservice is running!" }` | 200 (OK) |

---

### 🧪 Testing Documentation
Overview

The Expense Tracker backend includes automated tests to ensure API endpoints and core logic work as expected.
Testing is done using:
Jest → JavaScript testing framework for running test suites.
Supertest → For making HTTP assertions (API request/response testing).
```
expense-tracker-service/
│
├── tests/
│   └── expenses.test.js      # Jest test file
```

Running the Tests

Step 1: Install Test Dependencies
From your backend directory (expense-tracker-service): npm install --save-dev jest supertest cross-env

Step 2: Update your package.json scripts
In expense-tracker-service/package.json, add or modify:
"scripts": {
  "test": "cross-env NODE_ENV=test jest --runInBand"
}

Step 3: Run Tests
Now you can execute tests from the backend folder: npm test


---

### 🔐 Production Deployment Preparation

Before production deployment, the following key measures will be applied:

**Environment Variables**:
The .env file will be excluded from production. Sensitive data will be managed securely using services like AWS Secrets Manager or platform-specific configs.

**Authentication**:
A login feature will be added for user-specific expense tracking.

**JWT Authorization**:
APIs will require a valid JWT token (Authorization: Bearer <token>) to ensure secure and authorized access.


---

### 🌍 Future Enhancements

✅ Persistent database (MongoDB or PostgreSQL)

✅ Authentication with JWT

✅ Role-based authorization

✅ Cloud deployment (AWS / Render)

✅ Dockerization for containerized deployment

---

## Objective
Design and implement a simple microservice that adheres to **MACH architecture principles**:
- **Microservices**: Independently deployable services.
- **API-first**: All functionality exposed via APIs.
- **Cloud-native**: Designed for cloud environments.
- **Headless**: Decoupled frontend and backend.

The microservice should expose a RESTful API to manage a resource (for example, a **health goal** for consumers).

---

## Requirements


### 1. Design the Microservice
- Define the resource your service will manage (e.g., health goals, user profiles, tasks). For example, you may choose to manage a `health goal` resource.
- Create a **brief architectural diagram** showing how your service fits into a MACH ecosystem and potential interactions with other services.  
  > You may use Mermaid.js, draw.io, or any tool of your choice. Include the diagram (or link) in your repo, preferably in a `/docs` folder or directly in the README.


### 2. Implement the Microservice
- Choose a programming language and framework:
  - **Java** (Spring Boot)
  - **Python** (Flask or FastAPI)
  - **JavaScript/TypeScript** (Node.js with Express or NestJS)
- Implement a RESTful API with endpoints for:
  - `POST /resource` → Create a new resource
  - `GET /resource` → Retrieve all resources
  - `PUT /resource/{id}` → Update a resource
  - `DELETE /resource/{id}` → Delete a resource
- Include:
  - Input validation
  - Error handling


### 3. Documentation
Add clear documentation in your repo that explains:
- How to set up and run the service locally (use code blocks for commands).
- The design choices you made, including any assumptions.
- How your service adheres to MACH principles.

**Recommended Documentation Structure:**
- Setup
- Usage
- Design Decisions
- MACH Principles
- API Reference
- Testing


### 4. Testing
- Write **unit tests** for your API endpoints.  
- Provide instructions on how to run the tests.  


### 5. Optional Enhancements 
- Cloud deployment instructions (AWS, Azure, GCP).  
- Simple frontend interface (e.g., React) to interact with the API. 
- Infrastructure as Code (Terraform) for provisioning.
- Briefly describe your approach to automated testing and deployment (CI/CD).


## Deliverables
- Working microservice in your chosen language/framework.  
- README documenting design and setup.  
- Unit tests.  
- Optional: diagrams, deployment/config files, frontend.  

---


## Getting Started
- [ ] Fork this repository (`ccep-mach-microservice-exercise`) into your own GitHub account
- [ ] Fill in your name at the top of this README under *Candidate Name*
- [ ] Implement your solution in the forked repository
- [ ] Update the README with your instructions and design notes
- [ ] Share the link to your completed repository

---


## Candidate Note on Evaluation
Submissions will be evaluated on correctness, code quality, documentation clarity, adherence to MACH principles, and test coverage.
