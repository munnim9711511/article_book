var express = require('express');
var router = express.Router();
var noticedb = require("../config/notics");

/* GET users listing. */
router.get('/lates-notice', function(req, res, next) {
  noticedb.find({},null,{limit:1},function(erro,notice){
       res.send(notice);
  });
});
router.post("/inser-notice",(req,res,next)=>{
    var notic = new noticedb({
        title:req.body.title,
        message:req.body.message
    });
    notic.save();
});

module.exports = router;