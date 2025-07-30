const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error('FATAL: MONGO_URI is not defined');
  process.exit(1);
}

if (!process.env.FRONTEND_URL) {
  console.warn('WARNING: FRONTEND_URL is not defined - CORS may be restrictive');
}

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

// --- Middleware ---

// Define a list of allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL, // Set in Azure
  'http://localhost:3000',  // For local dev
  'http://localhost:5173'   // For local dev (Vite)
].filter(Boolean); // This ensures no undefined values are in the array

// Log the CORS whitelist for debugging
console.log('CORS Whitelist - Allowed Origins:', allowedOrigins);

// Create the detailed CORS options object
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or curl) or if the origin is in our whitelist
    if (!origin || (allowedOrigins.length > 0 && allowedOrigins.includes(origin))) {
      callback(null, true);
    } else {
      callback(new Error(`This origin is not allowed by CORS policy. Origin: ${origin}, Allowed: ${allowedOrigins.join(', ')}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use the new corsOptions object
app.use(cors(corsOptions)); 

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Error Handling Middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Handle CORS errors specifically
  if (err && err.message && err.message.includes('CORS')) {
    return res.status(403).json({ 
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// --- Routes ---
app.get('/', (req, res) => res.json({ 
  status: 'API Running',
  version: process.env.npm_package_version,
  timestamp: new Date().toISOString()
}));

app.use('/api/auth', require('./routes/auth'));

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectWithRetry();
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

  setTimeout(() => {
    console.error('Forcing shutdown...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));