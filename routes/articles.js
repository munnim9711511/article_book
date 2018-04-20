var express = require('express');
var router = express.Router();
var articleDB = require("../config/articles");


/* GET home page. */
router.post('/article-publishe',(req, res, next)=> {

    let uploadFile =req.files.article;
    var userdb = new articleDB({
        title:req.body.title,
        articleName:req.body.articleName,
        summery:req.body.summery,
        articleLocation:`/upload/${req.body.articleName}.pdf`
    });


    userdb.save();
    uploadFile.mv(`./public/upload/${req.body.articleName}.pdf`,(err)=>{

        if(err){
            return res.status(500).send(err);
        }

    });
    
    res.send("dat saved");
});
router.get("/admin-panel",(req,res,next)=>{

    res.render("admin");

});

router.get("/get-articles-data",(req,res,next)=>{

     articleDB.find(function (err, resdb) {
        if (err) return console.error(err);
        res.send(resdb);
      });
    
   
      
});

module.exports = router;