const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    userName:String,
    email:String,
    password:String,
    dateCreated:{ type: Date, default: Date.now }
    

});
userSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

var USER = mongoose.model('users', userSchema);
module.exports =USER;
