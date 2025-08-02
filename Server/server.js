const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users'); // Import user routes
const categoryRoutes = require('./routes/categories');
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Body Parser Middleware to accept JSON data
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));