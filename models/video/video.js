var mongoose = require('mongoose');

var video = mongoose.Schema({
    title: String,
    ytID: String
});

module.exports = mongoose.model( 'video', video );