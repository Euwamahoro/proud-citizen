const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Health Check Endpoints
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/readyz', async (req, res) => {
  try {
    // More thorough check than just readyState
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ 
      ready: true,
      db: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({ 
      ready: false,
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced MongoDB Connection
const connectWithRetry = (retries = 5, interval = 5000) => {
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
    maxPoolSize: 10
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error(`MongoDB connection error (${retries} retries left):`, err.message);
    if (retries > 0) {
      setTimeout(() => connectWithRetry(retries - 1, interval), interval);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  });
};

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get('/', (req, res) => res.json({ 
  status: 'API Running',
  version: process.env.npm_package_version,
  timestamp: new Date().toISOString()
}));

app.use('/api/auth', require('./routes/auth'));

// Server Initialization
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectWithRetry(); // Initiate DB connection after server starts
});

// Graceful Shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false)
      .then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      });
  });

  // Force shutdown if not completed in 10 seconds
  setTimeout(() => {
    console.error('Forcing shutdown...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));