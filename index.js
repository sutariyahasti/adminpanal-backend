const express = require('express');
const connectDB = require('./config/mongodb');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const imageRoutes = require('./routes/projectRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', imageRoutes);

app.get("/",(req,res)=>{
    res.send('Hello World\n');
})
// Start the server
const port = process.env.PORT || 7000;
const hostname = process.env.HOSTNAME ;

app.listen(port, () => {
  console.log(`Server running on port http://${hostname}:${port}`);
});
