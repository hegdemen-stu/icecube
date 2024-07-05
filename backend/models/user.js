const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
