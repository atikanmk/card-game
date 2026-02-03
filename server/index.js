const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const userStorage = require('./routes/auth');
const setupSocketHandlers = require('./socket/gameSocket');

const app = express();
const server = http.createServer(app);

// Configure CORS based on environment
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Card Game Server is running',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Authentication routes
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }
  
  const result = userStorage.register(username, password);
  res.status(result.success ? 200 : 400).json(result);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }
  
  const result = userStorage.login(username, password);
  res.status(result.success ? 200 : 401).json(result);
});

// Setup Socket.IO handlers
setupSocketHandlers(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});
