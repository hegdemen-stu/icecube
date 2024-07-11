const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/user'); // Import User model
const { MongoClient, GridFSBucket } = require('mongodb');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Allow cookies
}));

app.use(express.json());

// Session configuration
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 } // secure should be true in production with HTTPS
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', require('./routes/authRoutes'));

const conn = mongoose.connection;
conn.once('open', () => {
    console.log('MongoDB connection established successfully');
});

let gfs;

conn.once('open', () => {
    const gfs = new GridFSBucket(conn.db, {
      bucketName: 'musicFiles'
    });
  
    app.get('/songs', async (req, res) => {
      try {
        const files = await gfs.find().toArray();
        res.json(files); // Ensure this returns an array
      } catch (error) {
        res.status(500).json({ error: 'Error fetching songs' });
      }
    });
  
    app.get('/stream/:filename', (req, res) => {
      const readStream = gfs.openDownloadStreamByName(req.params.filename);
      readStream.pipe(res);
    });
  });
  

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
