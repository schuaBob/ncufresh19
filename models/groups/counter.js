var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var counter = mongoose.Schema({

    index_num: Int32Array,
    de_num: Int32Array,
    others_num: Int32Array,
    ass_num: Int32Array,
    com_num: Int32Array,






});
module.exports = mongoose.model('counter', counter)