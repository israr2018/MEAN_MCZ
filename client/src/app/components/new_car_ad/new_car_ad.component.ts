import { Component, OnInit, enableProdMode } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import { NewCarAdModal } from "./new_car_ad";
import { CarAdService } from "../services/carAd/carAd.service";
import { ICarMakes } from "./../../entities/CarMakes";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";
import { NewCarAdModel } from "./../../entities/new_car_ad";
import { ICarAd } from './../car_ads/car_ad';
@Component({
  
  templateUrl: "new_car_ad.component.html"
})
export class NewCarAdComponent implements OnInit {
  pageTitle: string = "New Car Ad";
  errMsg: any[];
  code: any;
  varif_code_model = {};
  carMakes: ICarMakes[];
  selectedCarMakeId: string;
  selectedCarMakeName: string;
  selectedCarModelId: string;
  selectedCarModelName: string;
  otherCarModelName: string;
  otherCarMakeName: string;
  //selectedFile:File=null;
  selectedFile: File[] = null;
  isAdSumbitted: boolean;
  messageOnAdSubmission: string;
  showOtherCarMake: boolean;
  showOtherCarModel:boolean=false;
  show_varification: Boolean;
  submitting_ad:Boolean;
  

  //carMakes:any[];
  carModels: any[];
  //myform: FormGroup;
  model = new NewCarAdModel();

  constructor(private _carAdService: CarAdService, private router: Router) {
    this.submitting_ad=false;

  }
  register(): void {
    this.submitting_ad=true;
    let formData: any = new FormData();
    // formData.append('car_image',  this.selectedFile[0],this.selectedFile[0].name);
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append(
        "car_image",
        this.selectedFile[i],
        this.selectedFile[i].name
      );
    }
    formData.append("car_description", this.model.car_description);
    formData.append("car_price", this.model.car_price);
    formData.append("car_km_driven", this.model.km_driven);
    formData.append("car_engine_type", this.model.car_engine_type);
    formData.append("car_model_year", this.model.car_model_year);
    formData.append("car_transmission_type", this.model.car_transmission_type);
    formData.append("car_engine_capacity", this.model.car_engine_capacity);
    formData.append("contact_number", this.model.contact_number);
    formData.append("car_model_id", this.model.car_model_id);
    formData.append("car_registration_type",this.model.car_registration_type);
    if (this.showOtherCarMake) {
      formData.append("car_make_name", this.otherCarMakeName);
      formData.append("car_model_name", this.otherCarModelName);
    } else {
      if(this.showOtherCarModel){
        formData.append("car_model_name", this.otherCarModelName);
      }
      else
      {
        formData.append("car_model_name", this.selectedCarModelName);
      }
      formData.append("car_make_name", this.selectedCarMakeName);
      formData.append("car_make_id", this.selectedCarMakeId);
      formData.append("car_model_id", this.selectedCarModelId);
      
    }
    
   // 
    this._carAdService.saveCarAd(formData).subscribe(data=>
      {
       
        this.router.navigate(['/car_ads']);
       },
       error=>{
          console.log("error");
          
      });
  } // end register()

  onFileSelect(event) {
    let reader = new FileReader();
    this.selectedFile = event.target.files;

    
  }
  log(x) {
    console.log(x);
  }
  get diagnostic() {
    return JSON.stringify(this.model);
  }
  ngOnInit(): void {
    this.isAdSumbitted = false;
    this.showOtherCarMake = false;
    this.show_varification = false;
    this.loadData();
  }
  loadData(): void {
    this._carAdService.getCarManufactureList().subscribe(
      carMakes => {
        this.carMakes = carMakes;
      // make a default select item from the drop down list
        this.selectedCarMakeId = this.carMakes[0]._id;
        this.selectedCarMakeName=this.carMakes[0].car_make;
        this.loadCarModels(this.selectedCarMakeId);
       
      },
      error => {
        this.errMsg = error;
      }
    );

   
   
  }
  onMakeSelect(carMakeId): void {
    console.log("CarMake id:" + carMakeId);
    this.selectedCarMakeId = carMakeId;
    this.selectedCarMakeName = this.carMakes.find(
      x => x._id == this.selectedCarMakeId
    ).car_make;
    console.log("..." + this.selectedCarMakeName);
    if (this.selectedCarMakeName == "other") {
      this.showOtherCarMake = true;
    } else {
      this.showOtherCarMake = false;
     this.loadCarModels(carMakeId);
      // console.log("car models"+ JSON.stringify(carModels));
    }
  }

  loadCarModels(carMakeId:any):void{

    this._carAdService.getCarModals(carMakeId).subscribe(
      carModels => {
        this.carModels = carModels;
        this.selectedCarModelId=this.carModels[0]._id;
        this.selectedCarModelName=this.carModels[0].car_model_name;
        console.log(this.selectedCarModelName);
      },
      error => {
        this.errMsg = error;
      }
    );
  }

  
  onCarModelSelect(model_id): void {
      this.selectedCarModelName = this.carModels.find(
      x => x._id == this.selectedCarModelId
    ).car_model_name;
 console.log("selectedCarModleName--"+this.selectedCarModelName);
  if(this.selectedCarModelName=="other"){
    this.showOtherCarModel=true;
    console.log(this.showOtherCarModel);
  }
  else{
    this.showOtherCarModel=false;
  }
   
}

}
