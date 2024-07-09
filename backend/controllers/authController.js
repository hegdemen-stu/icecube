const User = require('../models/user');
const passport = require('passport');

const test = (req, res) => {
    res.json('Test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({ error: 'name is required' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'password is required and must be at least 6 characters' });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'email already exists' });
        }

        const user = new User({ name, email });
        await User.register(user, password);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Registration failed' });
    }
};

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('No user found or invalid credentials');
            return res.json({ error: 'Invalid email or password' });
        }

        req.login(user, (err) => {
            if (err) {
                console.log('Login error:', err);
                return next(err);
            }
            res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
        });
    })(req, res, next);
};


const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) return res.json({ error: 'Logout failed' });
        res.json({ message: 'Logout successful' });
    });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser
};
