# TaskFlow Backend - NestJS API

A RESTful API backend for the TaskFlow task management application built with NestJS, MongoDB, and JWT authentication.

## Features

- 🔐 **JWT Authentication** - Secure login and registration
- 📝 **Task Management** - Complete CRUD operations for tasks
- 👥 **User Management** - User profiles and management
- 🔍 **Task Filtering** - Filter tasks by status and category
- 🛡️ **Guards & Validation** - Protected routes with input validation
- 🌐 **CORS Enabled** - Ready for frontend integration
- 📊 **MongoDB Integration** - Mongoose ODM with schemas

## Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport
- **Validation**: Class Validator & Class Transformer
- **Language**: TypeScript

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Tasks (Protected Routes)
- `GET /tasks` - Get all user tasks (supports filtering)
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Query Parameters for Tasks
- `status` - Filter by task status (`pending`, `in-progress`, `completed`)
- `category` - Filter by task category

## Project Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=1d
   PORT=3000
   NODE_ENV=development
   ```

3. **Run the application**

   ```bash
   # Development mode with hot reload
   npm run start:dev
   
   # Production mode
   npm run start:prod
   
   # Watch mode
   npm run start
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Database Schema

### User Schema
```typescript
{
  email: string (unique, required)
  password: string (hashed, required)
  name: string (required)
  createdAt: Date
}
```

### Task Schema
```typescript
{
  title: string (required)
  description: string (optional)
  status: enum ['pending', 'in-progress', 'completed']
  category: string (optional)
  userId: ObjectId (reference to User)
  createdAt: Date
  updatedAt: Date
}
```

## Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data Transfer Objects
│   ├── jwt.strategy.ts  # JWT authentication strategy
│   ├── local.strategy.ts # Local authentication strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── dto/             # User DTOs
│   ├── schemas/         # Mongoose schemas
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── tasks/               # Tasks module
│   ├── dto/             # Task DTOs
│   ├── schemas/         # Task schema
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Example API Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "Complete project",
    "description": "Finish the TaskFlow application",
    "category": "Work",
    "status": "pending"
  }'
```

### Get tasks with filtering
```bash
curl -X GET "http://localhost:3000/tasks?status=pending&category=Work" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Development

The application runs on `http://localhost:3000` by default.

- MongoDB connection is established automatically on startup
- Hot reload is enabled in development mode
- CORS is enabled for frontend integration
- Global validation pipes are configured

## License

This project is [MIT licensed](LICENSE).