const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Databse Connected'))
.catch((err) => console.log('Database not connected', err))

const app = express();

app.use(cors({
    origin: 'http://localhost:5174', // Your frontend origin
    credentials: true, // Allow cookies
}));

app.use(express.json())

app.use('/', require('./routes/authRoutes'));


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))