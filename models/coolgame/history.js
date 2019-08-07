var mongoose = require('mongoose');

var history = mongoose.Schema({
    Id:String,
    Time:String,
    Name:{ type: String, default: "預設"},
    Date:{ type: Date, default: new Date() },
    Score:String
});

module.exports = mongoose.model('History',history);