var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var photo = mongoose.Schema({


    route: String,
    filename: String,
    pathname: String,

});
module.exports = mongoose.model('photo', photo)