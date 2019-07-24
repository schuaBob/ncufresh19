var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var student = mongoose.Schema({


    intro: String,
    section: String

});
module.exports = mongoose.model('student', student)