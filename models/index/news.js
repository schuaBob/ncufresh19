var mongoose = require('mongoose');
var docNews = mongoose.Schema({
    title : String,
    date : Date,
    category : Number,
    content : String
})

module.exports = mongoose.model('docNews',docNews);