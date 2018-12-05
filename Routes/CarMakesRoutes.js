var express=require('express');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var routes=function(CarMakes)
 {
    var carMakesRouter=express.Router();
    carMakesRouter.route('/')
    .post(function (req,res) {
    
        const carMakes=new CarMakes(req.body);
        
        
        CarMakes.create(carMakes,function(err,result){
            if(err){
                
                res.status(500).json({message:"Internal Server Error"});
            }
            else{
                
                res.status(201).json({_id:result._id,car_make:result.car_make});
            }
        });
    })
    .get(function (req,res) {
        
       // 
        var query={};
        if(req.query._id){
           query._id=req.query._id;
        }
      
       // res.send(resJson);
      CarMakes.find(query,function (err,carMakes) {
         // return res.status(501).json({"message":"error"});
           if(!err)
           {
            res.status(200).json(carMakes);
            
           } 
       });
    });
    // middleware for getting  car make based on car_make_id
    //api/carmakes/ace9lllollle
    carMakesRouter.use('/:carMakesId', function(req,res,next){
        
        CarMakes.findById(req.params.carMakesId, function(err,carMake){
            if(err)
                res.status(500).send(err);
            else if(carMake)
            {
                req.CarMake = carMake;
                next();
            }
            else
            {
                res.status(404).send('no CarMakes found');
            }
        });
    });
    
    carMakesRouter.route('/:carMakesId')
    .get(function(req,res){

      return res.send(200).json(req.CarMake);
       
    })

  
    .put(function(req,res){

        req.CarMake.car_make=req.body.car_make;
        
        req.CarMake.save(function(err2,result){
            if(err2){
                res.status(501).json({
                    "message":"Internal Server Error"
                })
            }
            else{
                
                res.status(200).json({
                    
                        "message":"Car Make updated successfully"
                    }
            );
            }
           })

      
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.CarMakes[p] = req.body[p];
        }

        req.CarMakes.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarMakes);
            }
        });
    })
    .delete(function(req,res){
        req.CarMakes.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    })
  
return carMakesRouter;
}

module.exports=routes;