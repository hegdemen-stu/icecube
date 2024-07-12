const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/user'); // Import User model
const { MongoClient, GridFSBucket } = require('mongodb');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Server from socket.io

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));

const app = express();
const server = http.createServer(app); // Create a server using http
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Your frontend origin
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

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
          const { genre } = req.query;
          const query = genre ? { 'metadata.genre': genre } : {};
          const files = await gfs.find(query).toArray();
          res.json(files);
      } catch (error) {
          res.status(500).json({ error: 'Error fetching songs' });
      }
  });
  
  
    app.get('/stream/:filename', (req, res) => {
      const readStream = gfs.openDownloadStreamByName(req.params.filename);
      readStream.pipe(res);
    });
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('create room', (roomCode) => {
    socket.join(roomCode);
    console.log(`Room created: ${roomCode}`);
  });

  socket.on('join room', (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room: ${roomCode}`);
    io.to(roomCode).emit('user joined', socket.id);
  });

  socket.on('chat message', (msg, roomCode) => {
    io.to(roomCode).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = 8000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
