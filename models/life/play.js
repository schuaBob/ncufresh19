var mongoose = require('mongoose');

var play = mongoose.Schema({
    mainTitle    : String,
    subTitle     : String,
    picture      : String,
    content      : String
});

module.exports = mongoose.model('play', play);