var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id       : String,
    password : String,
    unit     : String,
    role     : { type: String, default: "student" },
    name     : String
});

module.exports = mongoose.model('User', UserSchema);