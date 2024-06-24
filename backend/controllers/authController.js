const User = require('../models/user')

const test = (req, res) => {
    res.json('Test is working')
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and must be at least 6 characters'
            })
        };
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'email already exist'
            })
        };

        const user = await User.create({
            name, email, password
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: 'email and password are required'
            })
        };
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                error: 'email not found'
            })
        };
        const match = await user.comparePassword(password)
        if (!match) {
            return res.json({
                error: 'password is incorrect'
            })
        };
        const token = await user.generateToken()
        res.cookie('token', token, {
            httpOnly: true
        })
        return res.json({
            message: 'login success'
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    test,
    registerUser,
    loginUser
}