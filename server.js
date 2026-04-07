const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoute = require('./routes/analyze');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
//mongoose.connect(process.env.MONGODB_URI)
 // .then(() => console.log('MongoDB Connected'))
 // .catch((err) => console.log('MongoDB Error:', err));

// Routes
app.use('/api', analyzeRoute);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ResumeIQ Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});