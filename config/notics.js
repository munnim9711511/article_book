const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noticeSchema = new Schema({

    title:String,
    message:String,
    datePublished:{ type: Date, default: Date.now },
   

});

var NOTICE = mongoose.model('notice', noticeSchema);

module.exports = NOTICE;
