# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and attendance tracking. Built with **React**, **Node.js/Express**, **MySQL**, and **Sequelize ORM**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Bonus Features](#bonus-features)
- [Assumptions & Limitations](#assumptions--limitations)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

### Core Features

#### Employee Management
- ✅ **Add Employee**: Create new employee records with ID, name, email, and department
- ✅ **View Employees**: Display all employees in a responsive table
- ✅ **Delete Employee**: Remove employee records with confirmation
- ✅ **Email Validation**: Unique email addresses and format validation
- ✅ **Duplicate Prevention**: Unique employee IDs

#### Attendance Management
- ✅ **Mark Attendance**: Record daily attendance (Present/Absent)
- ✅ **View Records**: Display attendance with employee details
- ✅ **Filter by Date**: Filter attendance records by specific dates
- ✅ **Prevent Duplicates**: Cannot mark attendance twice for same date/employee
- ✅ **Date Validation**: Cannot mark future dates

#### Dashboard
- ✅ **Employee Statistics**: Total employee count
- ✅ **Daily Summary**: Present, Absent, and Not Marked counts
- ✅ **7-Day Trend**: Attendance trend visualization
- ✅ **Top Performers**: Employees with highest attendance
- ✅ **Attendance Rate**: Today's attendance percentage

### Bonus Features
- ✅ Date filtering for attendance records
- ✅ Total present days per employee
- ✅ Dashboard summary with charts and statistics
- ✅ Top employees ranking
- ✅ Attendance rate percentage calculation
- ✅ 7-day attendance trend visualization

### Additional Features
- ✅ Professional UI with consistent styling
- ✅ Comprehensive error handling
- ✅ Loading states for all async operations
- ✅ Empty states with helpful messages
- ✅ Form validation (frontend & backend)
- ✅ Responsive design (mobile-friendly)
- ✅ Reusable global CSS
- ✅ Success/Error alerts
- ✅ RESTful API design
- ✅ CORS enabled
- ✅ Health check endpoint

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **React Router DOM 7.13.1** - Client-side routing
- **Axios 1.13.6** - HTTP client
- **React Bootstrap 2.10.10** - UI components
- **Bootstrap 5.3.8** - CSS framework

### Backend
- **Node.js & Express 5.2.1** - Web framework
- **Sequelize 6.37.8** - ORM
- **MySQL2 3.19.0** - Database driver
- **CORS 2.8.6** - Cross-origin requests
- **Dotenv 17.3.1** - Environment variables
- **Nodemon 3.1.14** - Development server

### Database
- **MySQL 8.0+** - Relational database

---

## 📁 Project Structure

```
HRMS Lite/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── attendance.controller.js
│   │   ├── dashboard.controller.js
│   │   └── employee.controller.js
│   ├── middleware/
│   │   └── error.middleware.js   # Global error handler
│   ├── models/
│   │   ├── attendance.model.js
│   │   ├── employee.model.js
│   │   └── index.js              # Model associations
│   ├── routes/
│   │   ├── attendance.routes.js
│   │   ├── dashboard.routes.js
│   │   └── employee.routes.js
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server entry point
│   ├── package.json
│   ├── .env                      # Environment variables
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttendanceForm.jsx
│   │   │   ├── AttendanceTable.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Attendance.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Employees.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios configuration
│   │   ├── styles/
│   │   │   └── global.css        # Global styles
│   │   ├── App.js
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   ├── package.json
│   ├── .env                      # Environment variables
│   ├── .gitignore
│   └── README.md
│
└── README.md
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **MySQL** (v8.0 or higher) - [Download](https://www.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should be v16.0.0 or higher
npm --version     # Should be v8.0.0 or higher
mysql --version   # Should be v8.0.0 or higher
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "HRMS Lite"
```

### 2. Setup Backend

#### 2.1 Install Dependencies

```bash
cd backend
npm install
```

#### 2.2 Configure Database

Create a new MySQL database:

```sql
CREATE DATABASE hrms_lite;
```

Or use the default database name `hrms_db` as configured in `.env`.

#### 2.3 Update Environment Variables

Edit `backend/.env`:

```env
PORT=5000
DB_NAME=hrms_db
DB_USER=root
DB_PASS=''
DB_HOST=localhost
```



### 3. Setup Frontend

#### 3.1 Install Dependencies

```bash
cd ../frontend
npm install
```

#### 3.2 Update Environment Variables

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ⚙️ Configuration

### Backend Configuration

**Database Configuration** (`backend/config/db.js`):
- Uses Sequelize ORM
- Automatically creates tables on first run
- Implements foreign key relationships

**Error Handling** (`backend/middleware/error.middleware.js`):
- Catches validation errors
- Handles unique constraint violations
- Returns consistent error responses

### Frontend Configuration

**API Service** (`frontend/src/services/api.js`):
- Axios instance with base URL
- Response interceptors for error handling
- 10-second timeout for requests

---

## 🏃 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MySQL Connected
```

### Terminal 2: Start Frontend Server

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view frontend in the browser.
Local:   http://localhost:3000
```

### Access Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Health Check

```
GET /api/health
Response: { success: true, message: "Server is running" }
```


### 1. Adding Employees

1. Navigate to **Employees** page
2. Fill in the form:
   - Employee ID (unique)
   - Full Name
   - Email Address
   - Department
3. Click **Add Employee**
4. View the new employee in the table

### 2. Marking Attendance

1. Navigate to **Attendance** page
2. Fill in the form:
   - Select Employee
   - Select Date
   - Choose Status (Present/Absent)
3. Click **Mark Attendance**
4. View records in the table below

### 3. Filtering Attendance

1. On **Attendance** page
2. Use the date filter
3. View filtered records
4. Click **Clear Filter** to reset

### 4. Viewing Dashboard

1. Navigate to **Dashboard** (home page)
2. View:
   - Employee statistics
   - Today's attendance summary
   - 7-day attendance trend

---

## 🎁 Bonus Features

### 1. Date Filtering ✅
- Filter attendance records by date
- See specific date's attendance

### 2. Employee Attendance Statistics ✅
- Total Present days per employee
- Total Absent days per employee
- Total marked days per employee

### 3. Dashboard Summary ✅
- **Today's Metrics**:
  - Total employees
  - Present today
  - Absent today
  - Not marked yet

- **Attendance Rate**: Percentage of employees present today

- **7-Day Trend**: Daily present/absent count for last 7 days



---

## 📝 Validation Rules

### Employee Validation
- **Employee ID**: Required, unique, non-empty
- **Full Name**: Required, 2-100 characters
- **Email**: Required, unique, valid format (user@domain.com)
- **Department**: Required, non-empty

### Attendance Validation
- **Employee ID**: Required, must exist in system
- **Date**: Required, valid format (YYYY-MM-DD), cannot be future date
- **Status**: Required, "Present" or "Absent" only
- **Uniqueness**: Cannot mark same employee twice on same date

---

## 📋 Assumptions & Limitations

### Assumptions
1. **Single Admin User**: No authentication/authorization required
2. **Local Database**: MySQL running on localhost
3. **Development Environment**: Uses nodemon for backend
4. **No Advanced Features**: No payroll, leave management, or reporting

### Limitations
1. **Database**: Not deployed (requires local MySQL setup)
2. **File Upload**: No document/image upload feature
3. **Real-time Updates**: No WebSocket for live updates
4. **Email Notifications**: No email alerts implemented
5. **Multi-user**: No concurrency handling or user management
6. **Export**: No data export to Excel/PDF

### Design Decisions
1. **Sequelize ORM**: Chosen for ease of validation and relationships
2. **Global CSS**: All styles in single file for maintainability
3. **No Redux/Context**: Simple state management sufficient for scope
4. **RESTful API**: Standard design for scalability
5. **Responsive Bootstrap**: Professional, mobile-friendly UI

---

