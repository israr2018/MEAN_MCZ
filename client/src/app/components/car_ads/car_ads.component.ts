import {
  Component,
  OnInit
} from '@angular/core';

import {
  CarAdService
} from '../services/carAd/carAd.service';
import {
  ICarAd
} from './car_ad';
import {
  Jsonp
} from '@angular/http';
import { LowerCasePipe } from '@angular/common';
import { PaginationService } from '../services/pagination/pagination.service';
import { environment } from '../../../environments/environment';
@Component({

  templateUrl: 'car_ads.component.html'

})
export class CarAdsComponent implements OnInit {
  pageTitle: string = "Car Ads List";
  showImage: boolean = true;
  adsFilter: string = 'Toyota';
  isDataLoaded:boolean;
  carAds: any[];
  isValidPriceRange: boolean = false;
  isValidCarMake: boolean = false;
  isSearchMade:boolean=false;
  priceRange:any[]=["Select Price Range","2-3 Lacks","3-5 Lacks","5-7 Lacks","7-9 Lacks","9-12 Lacks","12-14 Lacks","14-16 Lacks"];
  defaultPriceRange:any="Select Price Range";
  defaultCarMakeOrModel:any="";
  backUpArray:any[]=[];
  pager:any={};
  pageItems:any[]=[];
  image_baseUrl:string;
  constructor(private _carAdService: CarAdService,private _paginationService:PaginationService) {
    this.image_baseUrl=environment.image_baseUrl;
    this.isDataLoaded=false;
  }
  
  ngOnInit() {

    this._carAdService.getCarAds().subscribe(resCarAds => {
      this.carAds = resCarAds;
      this.backUpArray=this.carAds;
      this.setPage(1);
      this.isDataLoaded=true;
    }, (error) => {

      this.isDataLoaded=false;

    });

  }

  setPage(page:number){
    
    
    this.pager = this._paginationService.getPages(this.carAds.length, page,10);
 
    // get current page of items
    this.pageItems = this.carAds.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  blur_price(price) {

    if (price === "Select Price Range") {
      this.isValidPriceRange = false;
     
    } else {
      this.isValidPriceRange = true;
    }

  }
  blur_carMakes(car_make) {
   
    if (car_make === '') {
   
      this.isValidCarMake = false;
    } else {
     
      this.isValidCarMake = true;
    }

  }
  search(car_makes: any, car_price: String) {
    // 2-4 Lacks
    // lowerRange=2
    // upperRange=4
    this.isSearchMade=true;
      const lowerRange:Number=+car_price.split('-')[0];// 2
      const upperRange:Number=+car_price.split('-')[1].charAt(0);
      
      var tempArr: any[] = this.carAds.filter(x => {
       
      if ((x.car_make.make_name.toLowerCase() == car_makes.toLowerCase()|| x.car_make.model_name.toLowerCase() == car_makes.toLowerCase())
    && (x.car_price< upperRange && x.car_price >lowerRange)
    ) 
         return true;
       });
     this.backUpArray = this.carAds;
     // show only filter records
     this.carAds=tempArr;
     this.setPage(1);
  }
  reset(){
    //show all car ads
   
    this.isValidCarMake=false;
    this.isValidPriceRange=false;
    this.isSearchMade=false;
    this.carAds=this.backUpArray;
    this.defaultPriceRange="Select Price Range";
    this.defaultCarMakeOrModel=null;
    this.carAds=this.backUpArray;
    this.setPage(1);
  }
}
