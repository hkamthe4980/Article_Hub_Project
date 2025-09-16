const express=require('express');
const connection =require('../connection');
const router = express.Router();
var auth = require('../services/authentication');


router.post("/addNewCategory",auth.authenticateToken,(req,resp,next)=>{
    let category = req.body;
    query = " insert into category (name) values(?)";
    connection.query(query,[category.name],(err,result)=>{
        if(!err){
            return resp.status(200).json({message:"Category Addes Successfully"});
        }
        else{
            return resp.status(500).json(err);
        }

    })


})


router.get('/getAllCategory',auth.authenticateToken,(req,resp)=>{
    query = "select *from category order by name";
    connection.query(query,(err,result)=>{
        if(!err){
            return resp.status(200).json(result);
        }
        else{
            return resp.status(401).json(err);
        }
    })
})


router.post('/updateCategory',auth.authenticateToken,(req,resp)=>{
    let category = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query,[category.name,category.id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0){
                return resp.status(404).json({message:"Cetegory id does not found"});
            }
            return resp.status(200).json({message:"Category Update Success"});
            

        }
    })

})
module.exports=router;