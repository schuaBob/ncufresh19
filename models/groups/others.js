var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var others = mongoose.Schema({


    name: String,
    intro: String

});
module.exports = mongoose.model('others', others)