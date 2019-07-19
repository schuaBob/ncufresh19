var mongoose = require('mongoose');
var calender = mongoose.Schema({
    pk: { type: Number, Unique: true, default: 0 },
    month: String,
    date: String,
    board_content: String
})

module.exports = mongoose.model('calender', calender);