var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documents = mongoose.Schema({
    type: String,
    college: String,
    name: String,
    name_en: String,
    introduction: String, //系所介紹
    intro_pic: [String],
    organization: String, //系學會
    organ_pic: [String],


});
module.exports = mongoose.model('departments', departments)