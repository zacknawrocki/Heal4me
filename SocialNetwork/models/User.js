const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    recently_viewed: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            }
        }
    ],
    psych_score: {
        type: Number,
        default: 100
    }
});

module.exports = User = mongoose.model('user', UserSchema)