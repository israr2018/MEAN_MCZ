const config = require('./config/index');
var express=require('express');
var app=express();
var path=require('path');
var cors=require('cors');
app.use(cors({credentials: true, origin: true}));

// //const logger = require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var db=mongoose.connect(config.database.connection).then(()=>{
console.log("Successfully connected to the database.")
},(error)=>{
console.log(`Could not connect to database something goes wrong:${error}`);
});
var  CarAds=require('./models/CarAds');
var  CarMakes=require('./models/CarMakes');
var  CarModels=require('./models/CarModels');
var  UserModel=require('./models/UserModel')

app.use('/uploads',express.static('uploads'));
app.use(express.static(__dirname+'/client/dist/mcza6'));
// app.use(express.static(__dirname+'/client/src'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var carAdsRouter=require('./Routes/CarAdsRoutes')(CarAds);
var carMakesRouter=require('./Routes/CarMakesRoutes')(CarMakes);
var carModelsRouter=require('./Routes/CarModelsRoutes')(CarModels);
var authRouter=require('./Routes/authRoute')(UserModel);
var indexRouter=require('./Routes/IndexRouter');

app.use("/api/CarAds",carAdsRouter);
app.use("/api/CarMakes",carMakesRouter);
app.use("/api/CarModels",carModelsRouter);
app.use("/api/authenticate",authRouter);
app.use("/*",indexRouter);
const port=process.env.PORT||8080;

// app.get('/*',function(req,res) {
   
//  res.sendFile('index.html',{root:'./client/dist/mcza6'});
// });
app.listen(port,function () {
    console.log("MCZ restfull api are running on port:"+port);

});