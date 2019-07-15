var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var community = mongoose.Schema({

    name: String,
    intro: String

});
module.exports = mongoose.model('community', community)