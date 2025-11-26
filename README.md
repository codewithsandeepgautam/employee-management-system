Employee Management System
A beautiful and responsive full-stack employee management application built with React.js frontend and GraphQL backend.

🚀 Features
Frontend
Beautiful UI: Modern glass-morphism design with smooth animations

Dual View Modes: Grid and Tile views for employee data

Responsive Design: Works perfectly on desktop, tablet, and mobile

CRUD Operations: Full Create, Read, Update, Delete functionality

Search & Filter: Real-time search and sorting capabilities

Employee Details: Comprehensive employee profile pages

Backend
GraphQL API: Efficient data fetching with flexible queries

MongoDB Integration: Scalable data storage with Mongoose ODM

Authentication Ready: JWT-based authentication setup

Performance Optimized: Proper indexing and query optimization

🛠 Tech Stack
Frontend
React.js 18

React Router DOM

GraphQL Client

Lucide React Icons

CSS3 with modern features

Backend
Node.js with Express

Apollo Server (GraphQL)

MongoDB with Mongoose

JWT for authentication

CORS & Helmet for security

📦 Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (local or cloud)

Backend Setup
bash
cd backend
npm install
npm start
Backend runs on: http://localhost:4000

Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

🎯 Usage
View Employees: Browse all employees in grid or tile view

Search: Use the search bar to find employees by name, department, or position

Add Employee: Click "Add Employee" to create new team members

Edit Employee: Use the menu button on each card to edit details

View Details: Click on any employee card to see full profile

Delete: Remove employees with confirmation dialog

📁 Project Structure
text
employee-management/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Main pages
│   │   ├── styles/        # CSS files
│   │   └── utils/         # API utilities
│   └── package.json
└── backend/
    ├── src/
    │   ├── schema/        # GraphQL schema
    │   ├── resolvers/     # GraphQL resolvers
    │   ├── models/        # MongoDB models
    │   └── middleware/    # Auth middleware
    └── package.json
🔧 API Endpoints
GraphQL Queries
employees: Get all employees with filtering

employee(id): Get specific employee details

employeesPaginated: Get paginated employee list

GraphQL Mutations
addEmployee: Create new employee

updateEmployee: Update employee details

deleteEmployee: Remove employee

🎨 Features Demonstrated
Modern React Patterns: Hooks, Context, Custom Hooks

GraphQL Integration: Efficient data fetching

Responsive Design: Mobile-first approach

Beautiful Animations: Smooth transitions and hover effects

Form Handling: Add and edit forms with validation

State Management: Local state with proper updates

📱 Responsive Breakpoints
Desktop: 1200px+

Tablet: 768px - 1199px

Mobile: 320px - 767px
