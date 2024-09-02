const express = require('express');
const connectDB = require('./config/mongodb');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const imageRoutes = require('./routes/projectRoutes');
const http = require('http')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extend: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', imageRoutes);

app.use("/",(req,res)=>{
    res.send('Hello World\n');
})
// Start the server
const port = process.env.PORT || 7000;
const hostname = process.env.HOSTNAME ;

server.listen(port, () => {
  console.log(`Server running on port http://${hostname}:${port}`);
});
