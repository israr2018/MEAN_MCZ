import {PipeTransform,Pipe} from '@angular/core';
import {ICarAd} from './car_ad';

@Pipe({
name:'carAdsFilter'

})
export class CarAdsFilterPipe implements PipeTransform{
transform(value:any[],is_active:Boolean):any[] {
    
   // filterBy=filterBy?filterBy.toLowerCase():null;
  var result:any[]= value.filter((carAd:any)=>
  { 

   if(carAd.is_active==is_active){
     return carAd;  
   }

  }
)

    return result;
    
   
}
}