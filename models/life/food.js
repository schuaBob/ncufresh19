var mongoose = require('mongoose');

var food = mongoose.Schema({
    mainTitle    : String,
    subTitle     : String,
    picture      : String,
    content      : String
});

module.exports = mongoose.model('food', food);