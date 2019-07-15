var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var department = mongoose.Schema({
    type: String,
    name: String,
    en_name: String,
    de_link: String,
    stu_link: String,
    qna_link: String,

});
module.exports = mongoose.model('department', department)