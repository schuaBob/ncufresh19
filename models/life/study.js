var mongoose = require('mongoose');

var Study = mongoose.Schema({
    type         : String,
    mainTitle    : String,
    name         : String,
    subTitle     : String,
    picture      : String,
    content      : String
});

module.exports = mongoose.model('Study', Study);