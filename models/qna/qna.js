var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var qna = mongoose.Schema({    
    postID: Number,
    authorID : { type: String, default: "anonymous" },
    category: { type: String, default: "" },
    title : String,
    qContent : String,
    aContent: { type: String, default: "" }, 
    count: { type: Number, default: 0 }, //點擊次數    
    reviewed: { type: Boolean, default: false } //審核與否
});


module.exports = mongoose.model('qna',qna);