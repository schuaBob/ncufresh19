var mongoose = require('mongoose');

var video = mongoose.Schema({
    ytID: String
});

module.exports = mongoose.model( 'video', video );