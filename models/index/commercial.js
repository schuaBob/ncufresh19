var mongoose = require('mongoose');
var commercial = mongoose.Schema({
    pk:{type:Number,default:0,unique:true},
    picPath: String
})

module.exports = mongoose.model('commercial',commercial);