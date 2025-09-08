## Node.js Backend Development

1. [Introduction to Backend Development](#introduction)
2. [Setting Up Your Development Environment](#setup)
3. [Node.js Fundamentals](#fundamentals)
4. [Building Your First HTTP Server](#first-server)
5. [Understanding Express.js Framework](#express)
6. [Database Integration with MongoDB](#database)
7. [Authentication and Authorization](#auth)
8. [API Design and RESTful Services](#api-design)
9. [Error Handling and Logging](#error-handling)
10. [Testing Your Backend](#testing)
11. [Deployment and Production](#deployment)
12. [Performance Optimization](#performance)

---

## Introduction to Backend Development {#introduction}

Backend development involves creating the server-side logic that powers web applications. Unlike frontend development which users interact with directly, backend development focuses on:

- **Server Logic**: Processing requests and generating responses
- **Database Operations**: Storing, retrieving, and manipulating data
- **API Development**: Creating endpoints for frontend consumption
- **Authentication**: Managing user identity and permissions
- **Business Logic**: Implementing core application functionality

### Why Node.js for Backend Development?

Node.js offers several advantages:
- **JavaScript Everywhere**: Use the same language for frontend and backend
- **Non-blocking I/O**: Excellent performance for I/O-intensive applications
- **Rich Ecosystem**: Massive npm package repository
- **Scalability**: Built-in support for concurrent connections
- **Rapid Development**: Fast prototyping and development cycles

---

## Setting Up Your Development Environment {#setup}

### Prerequisites

Before starting, ensure you have:
- Basic JavaScript knowledge
- Understanding of HTTP protocol
- Familiarity with command line/terminal

### Installation Steps

1. **Install Node.js**
   ```bash
   # Download from nodejs.org or use a version manager
   # Check installation
   node --version
   npm --version
   ```

2. **Set up your project directory**
   ```bash
   mkdir my-backend-app
   cd my-backend-app
   npm init -y
   ```

3. **Install essential tools**
   ```bash
   # Development dependencies
   npm install --save-dev nodemon
   
   # Production dependencies (we'll add these as we go)
   npm install express
   ```

4. **Configure package.json scripts**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js",
       "test": "jest"
     }
   }
   ```

### Development Tools Recommendations

- **Code Editor**: VS Code with Node.js extensions
- **API Testing**: Postman or Thunder Client
- **Database GUI**: MongoDB Compass or Studio 3T
- **Version Control**: Git

---

## Node.js Fundamentals {#fundamentals}

### Understanding the Event Loop

Node.js operates on a single-threaded event loop model:

```javascript
// Non-blocking I/O example
console.log('Start');

setTimeout(() => {
    console.log('Timer callback');
}, 0);

setImmediate(() => {
    console.log('Immediate callback');
});

process.nextTick(() => {
    console.log('Next tick callback');
});

console.log('End');

// Output order: Start -> End -> Next tick callback -> Immediate callback -> Timer callback
```

### Core Modules

#### File System Operations
```javascript
const fs = require('fs');
const path = require('path');

// Asynchronous file reading
fs.readFile(path.join(__dirname, 'data.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Promises-based approach
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('data.txt', 'utf8');
        console.log('File content:', data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
```

#### Working with Streams
```javascript
const fs = require('fs');

// Reading large files efficiently
const readStream = fs.createReadStream('large-file.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
    writeStream.write(chunk);
});

readStream.on('end', () => {
    console.log('File reading completed');
    writeStream.end();
});

readStream.on('error', (error) => {
    console.error('Read error:', error);
});
```

---

## Building Your First HTTP Server {#first-server}

### Basic HTTP Server

```javascript
// server.js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toLowerCase();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Simple routing
    if (path === '/' && method === 'get') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Welcome to my API' }));
    } else if (path === '/health' && method === 'get') {
        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Handling Request Data

```javascript
// Handling POST requests
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                console.log('Received data:', parsedBody);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                    message: 'Data received successfully',
                    receivedData: parsedBody 
                }));
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
});
```

---

## Understanding Express.js Framework {#express}

Express.js simplifies Node.js web development significantly. Let's build a comprehensive application.

### Basic Express Setup

```javascript
// app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Express API' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId, message: `User ${userId} requested` });
});

// Route with query parameters
app.get('/search', (req, res) => {
    const { q, limit = 10, offset = 0 } = req.query;
    res.json({ 
        query: q, 
        limit: parseInt(limit), 
        offset: parseInt(offset),
        results: [] 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
```

### Middleware Deep Dive

```javascript
// Custom middleware
const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next(); // Don't forget to call next()!
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Simple token validation (in production, use proper JWT validation)
    if (token !== 'Bearer valid-token') {
        return res.status(403).json({ error: 'Invalid token' });
    }
    
    req.user = { id: 1, username: 'john_doe' }; // Attach user info
    next();
};

// Apply middleware
app.use(requestLogger);

// Protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

### Building a Complete REST API

```javascript
// models/user.js - Simple in-memory storage (we'll replace with DB later)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;

// routes/users.js
const express = require('express');
const router = express.Router();

// GET /api/users - List all users
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: users.length,
            pages: Math.ceil(users.length / limit)
        }
    });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name and email are required' 
        });
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ 
            error: 'Email already exists' 
        });
    }
    
    const newUser = {
        id: nextId++,
        name,
        email
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, email } = req.body;
    
    if (name) users[userIndex].name = name;
    if (email) {
        // Check if email is taken by another user
        const emailTaken = users.some(u => u.email === email && u.id !== userId);
        if (emailTaken) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        users[userIndex].email = email;
    }
    
    res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

module.exports = router;

// app.js - Main application file
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## Database Integration with MongoDB {#database}

### Setting up MongoDB Connection

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### Creating Mongoose Models

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age cannot exceed 120']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profile: {
        avatar: String,
        bio: String,
        location: String
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Instance methods
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        profile: this.profile,
        createdAt: this.createdAt
    };
};

// Static methods
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema);
```

### Advanced Database Operations

```javascript
// services/userService.js
const User = require('../models/User');

class UserService {
    async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            return user.getPublicProfile();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }
    
    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user.getPublicProfile();
    }
    
    async updateUser(id, updateData) {
        const user = await User.findByIdAndUpdate(
            id, 
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user.getPublicProfile();
    }
    
    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('User not found');
        }
        return true;
    }
    
    async getUsers({ page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc' }) {
        const skip = (page - 1) * limit;
        
        // Build query
        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const [users, total] = await Promise.all([
            User.find(query)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit))
                .select('-__v'),
            User.countDocuments(query)
        ]);
        
        return {
            users: users.map(user => user.getPublicProfile()),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    
    async getUsersByTag(tag) {
        return await User.find({ tags: tag }).select('name email profile.avatar');
    }
    
    async aggregateUserStats() {
        return await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalUsers: { $sum: 1 },
                    activeUsers: { 
                        $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } 
                    },
                    averageAge: { $avg: "$age" }
                }
            }
        ]);
    }
}

module.exports = new UserService();
```

### Updated Controllers with Database

```javascript
// controllers/userController.js
const userService = require('../services/userService');

class UserController {
    async createUser(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    async getUsers(req, res, next) {
        try {
            const result = await userService.getUsers(req.query);
            res.json({
                success: true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }
    
    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    async deleteUser(req, res, next) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
    
    async getUserStats(req, res, next) {
        try {
            const stats = await userService.aggregateUserStats();
            res.json({
                success: true,
                data: stats[0] || {}
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
```

---

## Authentication and Authorization {#auth}

### JWT Authentication Implementation

```javascript
// utils/jwt.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

class JWTUtil {
    static generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    }
    
    static verifyToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
    
    static generateRefreshToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    }
}

module.exports = JWTUtil;
```

### User Authentication Model

```javascript
// models/Auth.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date
});

// Pre-save hash password
authSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
authSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Check if account is locked
authSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Handle login attempts
authSchema.methods.incLoginAttempts = function() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1, loginAttempts: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }
    
    return this.updateOne(updates);
};

module.exports = mongoose.model('Auth', authSchema);
```

### Authentication Service

```javascript
// services/authService.js
const Auth = require('../models/Auth');
const JWTUtil = require('../utils/jwt');
const crypto = require('crypto');

class AuthService {
    async register(userData) {
        const { email, password, role = 'user' } = userData;
        
        // Check if user exists
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        // Create user
        const user = new Auth({ email, password, role });
        await user.save();
        
        // Generate tokens
        const token = JWTUtil.generateToken({ 
            id: user._id, 
            email: user.email, 
            role: user.role 
        });
        
        const refreshToken = JWTUtil.generateRefreshToken({ id: user._id });
        
        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save();
        
        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified
            },
            token,
            refreshToken
        };
    }
    
    async login(email, password) {
        // Find user
        const user = await Auth.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        
        // Check if account is locked
        if (user.isLocked) {
            throw new Error('Account is temporarily locked due to too many failed login attempts');
        }
        
        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            await user.incLoginAttempts();
            throw new Error('Invalid credentials');
        }
        
        // Reset login attempts on successful login
        if (user.loginAttempts > 0) {
            await user.updateOne({
                $unset: { loginAttempts: 1, lockUntil: 1 },
                $set: { lastLogin: new Date() }
            });
        } else {
            user.lastLogin = new Date();
            await user.save();
        }
        
        // Generate tokens
        const token = JWTUtil.generateToken({ 
            id: user._id, 
            email: user.email, 
            role: user.role 
        });
        
        const refreshToken = JWTUtil.generateRefreshToken({ id: user._id });
        user.refreshToken = refreshToken;
        await user.save();
        
        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                lastLogin: user.lastLogin
            },
            token,
            refreshToken
        };
    }
    
    async refreshToken(refreshToken) {
        try {
            const decoded = JWTUtil.verifyToken(refreshToken);
            const user = await Auth.findById(decoded.id);
            
            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }
            
            const newToken = JWTUtil.generateToken({ 
                id: user._id, 
                email: user.email, 
                role: user.role 
            });
            
            return { token: newToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    
    async logout(refreshToken) {
        const user = await Auth.findOne({ refreshToken });
        if (user) {
            user.refreshToken = undefined;
            await user.save();
        }
    }
}

module.exports = new AuthService();
```

### Authentication Middleware

```javascript
// middleware/auth.js
const JWTUtil = require('../utils/jwt');
const Auth = require('../models/Auth');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access token required' 
            });
        }
        
        const token = authHeader.substring(7);
        const decoded = JWTUtil.verifyToken(token);
        
        const user = await Auth.findById(decoded.id).select('-password -refreshToken');
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
```

---

## API Design and RESTful Services {#api-design}

### RESTful API Best Practices

```javascript
// config/apiResponse.js
class ApiResponse {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }
    
    static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString()
        });
    }
    
    static paginated(res, data, pagination, message = 'Success') {
        return res.status(200).json({
            success: true,
            message,
            data,
            pagination,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = ApiResponse;
```

### Input Validation

```javascript
// middleware/validation.js
const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};