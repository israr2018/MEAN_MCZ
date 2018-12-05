import {
  Component,
  OnInit
} from "@angular/core";
import {
  AdminComponent
} from './../admin.component';
import {
  CarAdService
} from './../../services/carAd/carAd.service';
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import {
  CarMakeService
} from './../../services/carAd/carMake.service';
import {
  ICarMakes
} from './../../../entities/CarMakes';

@Component({

  templateUrl: 'all_car_makes.component.html'
})
export class AllCarMakesComponent implements OnInit {

  pageTitle: string = "All Car Makes ";
  allCarMakes: any[] = [];
  allCarModels: ICarMakes[];
  model: any = {};
  pageMode: string;
  mode: string;
  make_name: string;
  is_active: boolean;
  car_make_id: String = '';
  ad_id: String;
  updated_car_make:String;

  // Edit, Delete, List=default 
  constructor(private _carMakeService: CarMakeService, private _adminComponent: AdminComponent) {

  }
  ngOnInit(): void {

    // this.loadCarAds();
    this.loadCarMakes();

  }

  loadCarMakes(): void {

    this._carMakeService.getAllCarMake().subscribe((result) => {

      this.allCarMakes = result.body;
    }, (error) => {
      console.log("error goes here");
      // console.log(`Error:${error.status}`);
    });

  }

  setEditMode(item, edit): void {
    item.isEditMode = edit;
    this.updated_car_make=item.car_make;
  }
  isEditMode() {
    if (this.mode == 'edit') {
      return true;
    } else {
      return false;
    }
  }
  cancel(): void {
    this.pageMode = '';
  }
  saveCarMake(): void {
    const CarMake = {
      car_make: this.make_name
    }
    if (this.make_name == null) {
      console.log(`car make is empty`);
    } else {
      this._carMakeService.addCarMake(CarMake).subscribe(
        result => {
          this.allCarMakes.push(result.body);
          this.make_name = "";
        },
        error => {}
      )
    }

  }
  updateCarMake(event, item): void {
   
  //  console.log("updated_car_make:"+this.updated_car_make);
   item.car_make=this.updated_car_make;
    if (event.target.value != null) {
      
      console.log("item.car_make:"+item.car_make);
      
      const updateCarMake = {
        _id: item._id,
        car_make: item.car_make
      };
      this._carMakeService.updateCarMake(updateCarMake, item._id).subscribe(
      (result) => {
            if (result.status == 200) {
              this.setEditMode(item, false);
            }
          },

      (error) =>{
                console.log("error occured while updating the car make"+error);
              }
          );
      }
      
   }
   deleteCarMake(item):void{
    console.log("deleteAd is called with id"+item._id);
   
    this._carMakeService.deleteCarMake(item._id)
        .subscribe((result)=>{
          this.allCarMakes=this.allCarMakes.filter(x=>{return x._id!=item._id});
        },
         
        (error)=>{console.log("error");}
      );

}
}