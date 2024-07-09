const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, logoutUser } = require('../controllers/authController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'http://localhost:5173']
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;
