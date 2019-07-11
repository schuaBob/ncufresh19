var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departments = mongoose.Schema({
    type: String,
    college: String,
    name: String,
    name_en: String,
    de_link: String,
    stu_link: String,


});
module.exports = mongoose.model('departments', departments)