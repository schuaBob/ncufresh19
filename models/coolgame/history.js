var mongoose = require('mongoose');

var history = mongoose.Schema({
    Id:String,
    Time:String,
    Date:{ type: Date, default: new Date() },
    Score:String
});

module.exports = mongoose.model('History',history);