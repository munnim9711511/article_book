var express = require('express');
var router = express.Router();
var pass = require("../config/passport");
var bcrypt = require('bcrypt');

var userdb = require("../config/user");


const saltRounds = 10;

const someOtherPlaintextPassword = 'not_bacon';

router.get("/reg-user",(req,res,next)=>{

  bcrypt.hash("welcome@mpl", saltRounds, function(err, hash) {
    var userreg = new userdb({
      userName:"admin",
      password:hash
  
  
    });
    userreg.save();
  });




res.send("user saved");

});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/wp-admin', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post("/login",  pass.authenticate('local', { 

                successRedirect: '/article/admin-panel',
                failureRedirect: '/wp-admin',
                failureFlash: true })

);
router.get("/logout",(req,res,next)=>{
  req.logout();
  res.redirect('/');
});


module.exports = router;
