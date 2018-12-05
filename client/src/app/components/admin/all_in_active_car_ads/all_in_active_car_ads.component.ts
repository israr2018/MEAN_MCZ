
import { Component, OnInit } from "@angular/core";


import { CarAdDetailsComponent } from './../../car_ad_details/car_ad_details.component';
import { AdminComponent } from './../admin.component';
import { CarAdService } from './../../services/carAd/carAd.service';
import {PaginationService } from '../../services/pagination/pagination.service';
@Component({
   
    templateUrl: 'all_in_active_car_ads.component.html'
})
export class AllInActiveCarAdsComponent implements OnInit {

    pageTitle: string = "All in Active Car Ads ";
    allCarAds: any[] = [];
    allCarMakes: any[] = [];
    allCarModels: any[] = [];
    model: any = {};
    pageMode: string;
    make_name: String;
    is_active: boolean;
    car_make_id: String;
    ad_id: String;
    model_name: String;
    car_price: String;
    car_description: String;
    car_engine_capacity: String;
    car_engine_type: String;
    car_model_year: String;
    car_transmission_type: String;
    contact_number: String;
    original_number:String;
    car_km_driven: String;
    car_ads_count:number;
    pager:any={};
    pageItems:any[]=[];
    // Edit, Delete, List=default 
    constructor(private _carAdService: CarAdService,private _adminComponent:AdminComponent,private _paginationService:PaginationService) {

    }
    ngOnInit(): void {

        this.loadCarAds();
        this.loadCarMakes();

    }
    setPage(page:number){
        this.pager = this._paginationService.getPages(this.allCarAds.length, page);
     
        // get current page of items
        this.pageItems = this.allCarAds.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }
    

    loadCarAds(): void {

    this.countAllCarAds();
    this.countAllActiveCarAds();
    this.countAllInActiveCarAds();

    }
    countAllCarAds(): void {
        this._carAdService.getCarAds().subscribe((result) => {
            this._adminComponent.all_car_ads_count = result.length;


        },
            (error) => { console.log("error") }
        );

    }
    countAllActiveCarAds(): void {

        this._carAdService.getActiveCarAds().subscribe((result => {

            this._adminComponent.active_car_ads_count = result.length;

        }),
            (error) => {
                console.log("error");

            });


    }
    countAllInActiveCarAds(): void {
        

        this._carAdService.getActiveCarAds(false).subscribe((result => {
            this.allCarAds=result;
            this._adminComponent.in_active_car_ads_count = result.length;
            this.setPage(1);

        }),
            (error) => {
                console.log("error");

            });

    }









    loadCarMakes(): void {

        this._carAdService.getCarManufactureList().subscribe((result) => {

            this.allCarMakes = result;
        }, (error) => {

            console.log("Error");
        });

    }

    loadCarModels(id: String): void {

        this._carAdService.getCarModals(id).subscribe((result) => {

            this.allCarModels = result;

        }, (error) => {

            console.log("Error");
        });


    }
    setPageMode(command, item) {

        this.pageMode = command;
        if (command == 'edit') {

            this.setEditEntity(item);
            this.loadCarModels(item.car_make.make_id)

        }

    }

    setEditEntity(item: any) {

        this.is_active = item.is_active;
        this.car_model_year = item.car_model_year;
        this.make_name = item.car_make.make_name;
        this.car_make_id = item.car_make.make_id;
        this.model_name = item.car_make.model_name;
        this.car_description = item.car_description;
        this.car_price = item.car_price;
        this.car_engine_capacity = item.car_engine_capacity;
        this.car_engine_type = item.car_engine_type;
        this.car_transmission_type = item.car_transmission_type;
        // this.car_image=item.car_image;
        this.car_km_driven = item.car_km_driven;
        this.ad_id = item._id;
        this.contact_number = item.contact_number;

    }

    updateAd(): void {

        var updateAd = {
            is_active: this.is_active,
            car_model_year: this.car_model_year,
            car_make: {
                make_id: this.car_make_id,
                make_name: this.make_name,
                model_name: this.model_name

            },
            car_description: this.car_description,
            car_price: this.car_price,
            car_km_driven: this.car_km_driven,
            car_transmission_type: this.car_transmission_type,
            car_engine_capacity: this.car_engine_capacity,
            car_engine_type: this.car_engine_type

        };
        this._carAdService.updateCarAd(updateAd, this.ad_id).subscribe((result) => {

            alert("Record is updated successfully");
            this.loadCarAds();
            this.setPageMode('default', null);

        },
            (error) => {
                alert("Error oocured in upate Ad");

            }

        );



    }
    deleteAd(item):void{
    console.log("deleteAd is called with id"+item._id);
    this._carAdService.deleteCarAd(item._id)
        .subscribe((result)=>{console.log(result)
         this.loadCarAds();
        },(error)=>{console.log("error")})
    }
    onMakeSelect(event): void {
        // this.make_name=this.allCarMakes.find(x=>x._id==event).car_make;
        var i = 0;
        for (; i < this.allCarMakes.length; i++) {

            if (this.allCarMakes[i]._id == event) {

                this.make_name = this.allCarMakes[i].car_make;
            }
        }

        this.loadCarModels(event);

    }
}

