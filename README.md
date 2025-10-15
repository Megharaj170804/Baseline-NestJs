# TaskFlow - Full-Stack Task Management Application

A complete full-stack task management application built with **Next.js** (frontend) and **NestJS** (backend), featuring user authentication, task CRUD operations, and responsive design.

## 🚀 **Project Overview**

**TaskFlow** is a modern, full-stack web application that allows users to:
- 🔐 **Register and login** with JWT authentication
- 📝 **Create, edit, and delete tasks** with detailed descriptions
- 🏷️ **Organize tasks** by categories and status
- 🔍 **Filter tasks** by status (pending, in-progress, completed) and category
- 📱 **Responsive design** that works on desktop and mobile devices

## 🏗️ **Technology Stack**

### **Frontend (Next.js)**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Headless UI, Heroicons
- **HTTP Client**: Axios
- **State Management**: React Context API

### **Backend (NestJS)**
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport
- **Validation**: Class Validator & Class Transformer
- **Security**: CORS enabled, password hashing with bcryptjs

## 📁 **Project Structure**

```
TaskFlow/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── auth/           # Authentication module (JWT, login, register)
│   │   ├── users/          # Users module (user management)
│   │   ├── tasks/          # Tasks module (CRUD operations)
│   │   ├── app.module.ts   # Main app module with MongoDB connection
│   │   └── main.ts         # Application entry point
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── login/     # Login page
│   │   │   ├── register/  # Registration page
│   │   │   └── dashboard/ # Main dashboard
│   │   ├── components/    # Reusable UI components
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskFilters.tsx
│   │   ├── contexts/      # React Context providers
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── useTasks.ts
│   │   └── lib/           # API services and utilities
│   │       └── api.ts
│   ├── .env.local         # Frontend environment variables
│   └── package.json
└── .github/
    └── copilot-instructions.md
```

## 🔧 **Setup Instructions**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### **1. Clone and Setup**
```bash
# Navigate to your project directory
cd "E:\Tekdi Technology\Baseline nestJS"
```

### **2. Backend Setup (NestJS)**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Environment setup
# The .env file is already configured with MongoDB connection
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# MONGODB_URI=mongodb+srv://...

# Start the backend server (runs on http://localhost:3000)
npm run start:dev
```

### **3. Frontend Setup (Next.js)**
```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Environment setup
# The .env.local file is configured with:
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Start the frontend server (runs on http://localhost:3001)
npm run dev
```

### **4. Access the Application**
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: Available through the backend endpoints

## 🔐 **API Endpoints**

### **Authentication**
```
POST /auth/register    # User registration
POST /auth/login       # User login
```

### **Tasks** (Protected - requires JWT token)
```
GET    /tasks          # Get user tasks (supports filtering)
POST   /tasks          # Create new task
GET    /tasks/:id      # Get specific task
PATCH  /tasks/:id      # Update task
DELETE /tasks/:id      # Delete task
```

### **Users** (Protected - requires JWT token)
```
GET /users/me          # Get current user profile
GET /users             # Get all users (admin)
```

## 🎯 **Key Features**

### **Authentication System**
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes and automatic token refresh
- ✅ Password hashing with bcryptjs

### **Task Management**
- ✅ Create tasks with title, description, category, and status
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Change task status (pending → in-progress → completed)
- ✅ Organize tasks by categories

### **Filtering & Search**
- ✅ Filter tasks by status (pending, in-progress, completed)
- ✅ Filter tasks by category
- ✅ Multiple filters can be applied simultaneously
- ✅ Clear all filters functionality

### **User Experience**
- ✅ Responsive design for mobile and desktop
- ✅ Loading states and error handling
- ✅ Form validation
- ✅ Toast notifications (implicit through error handling)
- ✅ Clean and modern UI with TailwindCSS

## 🔄 **Workflow Examples**

### **User Registration & Login**
1. Visit http://localhost:3001
2. Click "Get Started Free" → Register page
3. Fill registration form → Automatic login → Redirect to dashboard

### **Task Management**
1. In dashboard, click "New Task"
2. Fill task form (title, description, category, status)
3. Save task → Appears in task list
4. Use status buttons to change task progress
5. Edit or delete tasks as needed

### **Task Filtering**
1. Use sidebar filters to filter by status or category
2. See active filters displayed with clear options
3. Clear individual filters or all filters at once

## 🛡️ **Security Features**

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords encrypted with bcryptjs
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Both client and server-side validation
- **Protected Routes**: Authentication required for sensitive operations

## 📱 **Responsive Design**

The application is fully responsive and works seamlessly on:
- 💻 **Desktop** (1024px+)
- 📱 **Tablet** (768px - 1023px)  
- 📱 **Mobile** (320px - 767px)

## 🚀 **Deployment Ready**

### **Backend Deployment**
- Configure MongoDB connection string for production
- Update JWT_SECRET for production security
- Set NODE_ENV=production
- Deploy to platforms like Heroku, Railway, or DigitalOcean

### **Frontend Deployment**
- Update NEXT_PUBLIC_API_URL to production backend URL
- Deploy to Vercel, Netlify, or similar platforms
- Configure build settings for Next.js

## 🧪 **Testing the Application**

### **Manual Testing Checklist**
- [ ] User registration works
- [ ] User login works  
- [ ] Dashboard loads after login
- [ ] Create new task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Task filtering works
- [ ] Logout works
- [ ] Responsive design on mobile

### **API Testing**
Use tools like Postman or curl to test API endpoints:

```bash
# Register user
curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login user  
curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"password123"}'

# Create task (use token from login response)
curl -X POST http://localhost:3000/tasks \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{"title":"Test Task","description":"Test Description","category":"Work"}'
```

## 🏆 **Achievements**

✅ **Full-stack application** with modern architecture  
✅ **Type-safe** with TypeScript throughout  
✅ **Responsive design** with TailwindCSS  
✅ **Secure authentication** with JWT  
✅ **RESTful API** with proper status codes  
✅ **Real-time data** synchronization  
✅ **Production-ready** code structure  

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**TaskFlow** - Built with ❤️ using Next.js and NestJS