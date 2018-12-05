import { Component, OnInit } from "@angular/core";
import { CarAdService } from './../services/carAd/carAd.service';
@Component({

templateUrl:'admin.component.html'
})
export class AdminComponent implements OnInit{
  ngOnInit(): void {
    this.countAllCarAds();
    this.countAllActiveCarAds();
    this.countAllInActiveCarAds();
  }
  pageTitle:string="Admin";
  all_car_ads_count:number;
  active_car_ads_count:number;
  in_active_car_ads_count:number;


constructor(private _carAdService:CarAdService){


}
countAllCarAds():void{
this._carAdService.getCarAds().subscribe((result)=>{
this.all_car_ads_count=result.length;


},
(error)=>{console.log("error")}
);

}
countAllActiveCarAds():void{

this._carAdService.getActiveCarAds().subscribe((result=>{

this.active_car_ads_count=result.length;

}),
(error)=>{
  console.log("error");

});


}
countAllInActiveCarAds():void{


  this._carAdService.getActiveCarAds(false).subscribe((result=>{

    this.in_active_car_ads_count=result.length;
    console.log("in active car ads",this.in_active_car_ads_count);
    
    }),
    (error)=>{
      console.log("error");
    
    });

}




}
