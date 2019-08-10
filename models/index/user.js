var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    id: {
        type: String,
        default: "student"
    },
    password: String,
    unit: String,
    role: {
        type: String,
        default: "student"
    },
    name: {
        type: String,
        required: true
    },
    game_id: String,
    game_date: {
        type: Date,
        default: new Date()
    },
    score_sum: {
        type: Number,
        default: 0
    },
    score_high: {
        type: Number,
        default: 0
    },
    update: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: "default-profile.png"
    }
});

UserSchema.methods.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err) throw (err);
        callback(null, isMatch);
    });
}

let userObject = mongoose.model('User', UserSchema);

userObject.createUser = (user, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports = userObject;