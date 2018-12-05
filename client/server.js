const express=require('express');
const path=require('path');
const app=express();
app.use(express.static(path.join(__dirname,'/dist/mcza6')));
const port=process.env.PORT||8080;
app.get('/*',function(req,res){

    res.sendFile('./dist/mcza6/index.html');

});

app.listen(port,function(){

console.log("Server is running at port:"+port);

});