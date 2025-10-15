const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const path=require('path')

dotenv.config(); // Load .env file
const bookroute  = require('./routes/userRouter')
const app = express();
app.use(express.json()); // For parsing JSON
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('MongoDB connected successfully!');
});

app.use('/books',bookroute)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));