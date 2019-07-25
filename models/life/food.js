var mongoose = require('mongoose');

var food = mongoose.Schema({
    mainTitle    : String,
    content      : String
});

module.exports = mongoose.model('food', food);