var express=require('express');
var path=require('path');
var indexRouter=express.Router();
indexRouter.get("/*",function(req,res){

    //res.sendFile('index.html',{root:'../client/dist/mcza6'});
    res.send("hello World");
   
});

module.exports=indexRouter;
