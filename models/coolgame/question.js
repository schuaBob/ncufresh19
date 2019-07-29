var mongoose = require('mongoose');

var question = mongoose.Schema({
    Q:String,
    Op:String,
    Ans:String,
    Type:String
});

module.exports = mongoose.model('Question',question);