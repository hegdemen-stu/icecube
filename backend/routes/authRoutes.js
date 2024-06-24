const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser } = require('../controllers/authController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5174'
    })
)

router.get('/', test)
router.post('/Register', registerUser)
router.post('/Login', loginUser)

module.exports = router