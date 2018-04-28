const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({

    title:String,
    summery:String,
    articleName:String,
    datePublished:String,
    articleLocation:String,
    articlecoverPage:String

});

var ARTICLE = mongoose.model('article', articleSchema);

module.exports = ARTICLE;
