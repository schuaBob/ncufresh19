var mongoose = require('mongoose');

var Study = mongoose.Schema({
    mainTitle    : String,
    subTitle     : String,
    content      : String
});

module.exports = mongoose.model('Study', Study);