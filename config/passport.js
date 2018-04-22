var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require("../config/user");

passport.use(new LocalStrategy({
    
    passReqToCallback : true
},
  function(req,username, password, done) {
    User.findOne({ userName: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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