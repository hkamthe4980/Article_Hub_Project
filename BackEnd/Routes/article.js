const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');



router.post("/authNewArticle", auth.authenticateToken, (req, resp) => {
    let article = req.body;
    var query = " insert into article (title,content,publication_date,categoryId,status) values(?,?,?,?,?)";
    connection.query(query, [article.title, article.content, new Date(), article.categoryId, article.status], (err, result) => {
        if (!err) {
            return resp.status(200).json({ message: "Article Added Successfully" });
        }
        else {
            return resp.status(500).json(err)
        }
    })
})


router.get("/getAllArticle", auth.authenticateToken, (req, resp) => {
    var query = "select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId,c.name as categoryName from article as a inner join category as c where a.categoryId =c.id";
    connection.query(query, (err, result) => {
        if (!err) {
            return resp.status(200).json(result)
        }
        else {
            return resp.status(500).json(err)
        }
    })
})




router.get("/getAllPublishArticle",  (req, resp) => {
    var query = "select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId,c.name as categoryName from article as a inner join category as c where a.categoryId =c.id and a.status='published'";
    connection.query(query, (err, result) => {
        if (!err) {
            return resp.status(200).json(result)
        }
        else {
            return resp.status(500).json(err)
        }
    })
})

router.post("/updateArticle",auth.authenticateToken,(req,resp)=>{
    let article = req.body;

    var query = "update article set title=?,content=?,categoryId=?,publication_date=?,status=? where id=?";
    connection.query(query,[article.title,article.content,article.categoryId,new Date(),article.status, article.id],(err,result)=>{
        if(!err){
           if(result.affectedRows==0){
            return resp.status(404).json({message:"Article does not found "});

           }
           return resp.status(200).json({message:"Article Updated Successfully"})
        }
        else{
            return resp.status(500).json(err);
        }

    })
})

router.get("/deleteArticleData/:id" , auth.authenticateToken,(req,resp)=>{
    let id = req.params.id;
    var query = "delete from article where id=?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if(result.affectedRows===0){
                return resp.status(404).json({message:"Article does not found "})

            }
            return resp.status(200).json({message:"Deleted Data Successfully"});

        }
        else{
          return  resp.status(500).json({message:"Cannot delete data"})
        }
    })
})
module.exports = router




