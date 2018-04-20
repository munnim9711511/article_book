const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cerocilSchema = new Schema({

    NameName:String,
    location:String,
    dateCreated:{ type: Date, default: Date.now }
    

});

var CEROCIL = mongoose.model('users', userSchema);