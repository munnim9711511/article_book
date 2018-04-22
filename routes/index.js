var express = require('express');
var router = express.Router();
var pass = require("../config/passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/wp-admin', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post("/login",  pass.authenticate('local', { successRedirect: '/article/admin-panel',
                failureRedirect: '/wp-admin',
                failureFlash: true })
);


module.exports = router;
