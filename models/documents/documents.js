var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documents = mongoose.Schema({
    count : String,
    title : String,
    content : String,
});
module.exports = mongoose.model('documents',documents)
