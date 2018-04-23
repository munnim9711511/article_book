var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require("../config/user");
var bcript = require("bcrypt");

passport.use(new LocalStrategy(
  {

  },
  function(username, password, done) {
    User.findOne({ userName: username }, function(err, user) {
      if (err) { return done(err);}
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcript.compare(password,user.password,function(err,match){
        if(err){
          throw err;
        }
        if(match){
          return done(null, user);
        }
        else{
          return done(null,false,{message:"no user found"});
        }
      });
    
      
    });
  }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

module.exports = passport;