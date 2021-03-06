var express = require('express');
var router = express.Router();
var articleDB = require("../config/articles");
var articleMiddlewear = require("../config/auth.controll");
var note = require("../config/notics");

/* GET home page. */
router.post('/article-publishe',articleMiddlewear(),(req, res, next)=> {

    let uploadFile =req.files.article;
    let coverPage = req.files.coverpage;
    var userdb = new articleDB({
        title:req.body.title,
        articleName:req.body.articleName,
        summery:req.body.summery,
        articleLocation:`/upload/${req.body.articleName}.pdf`,
        articlecoverPage:`/coverpage/${req.body.articleName}.jpg`
    });


    userdb.save();
    uploadFile.mv(`./public/upload/${req.body.articleName}.pdf`,(err)=>{

        if(err){
            return res.status(500).send(err);
        }

    });
    coverPage.mv(`./public/coverpage/${req.body.articleName}.jpg`,(err)=>{

        if(err){
            return res.status(500).send(err);
        }

    });
    
    res.send("dat saved");
});
router.get("/admin-panel",articleMiddlewear(),(req,res,next)=>{

    res.render("admin");

});

router.get("/get-articles-data",(req,res,next)=>{

     articleDB.find(function (err, resdb) {
        if (err) return console.error(err);
        res.send(resdb);
      });
    
   
      
});

router.get("/get-last-four-articles",(req,res,next)=>{
    articleDB.find({},null,{limit:4},function (err, resdb) {
        if (err) return console.error(err);
        res.send(resdb);
      });
});
router.post("/publish-note",(req,res,next)=>{
    var noteDB = new note({

        title:req.body.title,
        message:req.body.message

    });
    noteDB.save();
   res.status(200);
});

module.exports = router;