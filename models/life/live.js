var mongoose = require('mongoose');

var live = mongoose.Schema({
    mainTitle    : String,
    subTitle     : String,
    picture      : String,
    content      : String
});

module.exports = mongoose.model('live', live);