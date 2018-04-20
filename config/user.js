const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    userName:String,
    email:String,
    password:String,
    dateCreated:{ type: Date, default: Date.now }
    

});

var USER = mongoose.model('users', userSchema);
