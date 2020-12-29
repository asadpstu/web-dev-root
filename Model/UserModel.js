const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

exports.UserModel = User;