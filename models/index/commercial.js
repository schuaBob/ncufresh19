var mongoose = require('mongoose');
var commercial = mongoose.Schema({
    pk: { type: Number, default: 0, Unique: true },
    picPath: String,
    picLink: String
})

module.exports = mongoose.model('commercial', commercial);