var express=require('express');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var routes=function(CarModels)
 {
    var carModelsRouter=express.Router();
    carModelsRouter.route('/')
    .post(function (req,res) {
    
        var carModel=new CarModels(req.body);
        carModel.save(function(error,newCarModel){

            if(!error){

               res.status(201).send(newCarModel);


            }
            else{

                res.status(500).send("Internal Server error occure while adding new car model");

            }


        });

        
        
 
    })
    .get(function (req,res) {
      var query={};
      if(req.query.car_make_id){

        query.car_make_id=req.query.car_make_id;
      }
      CarModels.find(query,function (err,carModels) {
          if(!err)
           {
            res.status(200).json(carModels);
            
           } 
           else{

            res.status(500).send(err);

           }
       });
    });
    carModelsRouter.use('/:model_id', function(req,res,next){
       
       //remember the find method return arrary 
        CarModels.findById({_id:req.params.model_id}, function(err,carModel){
            if(err)
            {
                res.status(500).send(err);

            }
            else  
            {
                //if the array is not empty
                if(carModel){
                
                req.CarModel = carModel;
                next();
                }
                else{
                    
                    res.status(404).send('no CarModel was  found');
                }
            }
            
        });
    });
    
    
    carModelsRouter.route('/:carModelsId')
    .get(function(req,res){

        res.status(200).send(req.CarModel);

    })
    .put(function(req,res){
        req.CarModel.car_model_name = req.body.car_model_name;
        
        
        req.CarModel.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarModel);
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.CarAds[p] = req.body[p];
        }

        req.CarAds.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarAds);
            }
        });
    })
    .delete(function(req,res){
        req.CarModel.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    });
  carModelsRouter.use('/ByMakeId/:make_id',function(req,res){
    
    res.send(200).json("ok");
  });
    carModelsRouter.get('/ByMakeId/:make_id',function(req,res){
        return res.status(200).send("Hellow World");

    });
    
    
return carModelsRouter;
}




module.exports=routes;