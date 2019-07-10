var mongoose = require('mongoose');
var docNews = mongoose.Schema({
    pk: { type: Number, default: 0 },
    title: String,
    date: Date,
    category: Number,
    content: String
})



module.exports = mongoose.model('docNews', docNews);