var mongoose = require('mongoose');

var time = mongoose.Schema({
    type         : String,
    time         : String,
    event        : String
});

module.exports = mongoose.model('time', time);