var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documents = mongoose.Schema({
    count: String,
    title: {type: String, default:' '},
    content: {type: String, default: ' '}
});
module.exports = mongoose.model('documents', documents)