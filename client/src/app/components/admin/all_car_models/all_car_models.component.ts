import {
  Component,
  OnInit,
  ValueProvider
} from "@angular/core";
import {
  AdminComponent
} from './../admin.component';
import {
  CarAdService
} from './../../services/carAd/carAd.service';
import {
  _getComponentHostLElementNode
} from "@angular/core/src/render3/instructions";
import {
  CarMakeService
} from "../../services/carAd/carMake.service";
import {
  CarModelService
} from "../../services/carAd/carModelService";
@Component({

  templateUrl: 'all_car_models.component.html'
})
export class AllCarModelsComponent implements OnInit {

  pageTitle: string = "Manage Car Models ";
  allCarMakes: any[] = [];
  allCarModels: any[] = [];
  commad_mode: String;
  model: any = {};
  make_name: String;
  car_make_id: String;
  car_model_id: String;
  car_model_name: String;
  new_car_model_name:String;

  hideCarMakeDDL: boolean;
  hideCarModelDDL: boolean;
  hideCarModelText: boolean;
  hideEditText: boolean;
  hideAddText: boolean;
  hideSaveButton: boolean;
  hideCancelButton: boolean;
  hideEditButton: boolean;
  hideDeleteButton: boolean;
  hideAddButton: boolean;


  // Edit, Delete, List=default 
  constructor(private _carMakeService: CarMakeService, private _carModelService: CarModelService, private _adminComponent: AdminComponent) {

  }
  ngOnInit(): void {


    this.loadCarMakes();
    this.setDefaultState();
    this.car_model_name = "";
  }


  loadCarMakes(): void {

    this._carMakeService.getAllCarMake().subscribe((result) => {

      this.allCarMakes = result.body;
      // make a defult select in car make drop down list
      // used for [(ngModel)]="car_make_id"
      this.car_make_id = this.allCarMakes[1]._id;
      this.loadCarModels(this.car_make_id);
     
    }, (error) => {

      console.log("error in loadCarMakes");
    });

  }

  loadCarModels(id: String): void {

    this._carModelService.getCarModelsByMakeId(id).subscribe((result) => {

      this.allCarModels = result.body;
      if (this.allCarModels.length > 0) {

        this.car_model_id = this.allCarModels[0]._id;
        this.car_model_name = this.allCarModels[0].car_model_name;
      }

    }, (error) => {

      console.log("Error");
    });

  }


  updateCarModel(): void {

    const updateCarModel = {
      car_model_name: this.car_model_name

    };

    this._carModelService.updateCarModel(updateCarModel, this.car_model_id).subscribe((result) => {

       
        this.loadCarMakes();
        this.loadCarModels(this.car_make_id);
        this.setDefaultState();


      },
      (error) => {
        alert("Error oocured in upate Ad" + error);

      }

    );

  }
  deleteCarModel(car_model_id:any): void {
    console.log("deleteAd is called with id"+car_model_id);
    this._carModelService.deleteCarModel(car_model_id)
        .subscribe((result)=>{
          
       
        },(error)=>{console.log("error")})
    
  }
  addNewCarModel(): void {
    console.log("new_car_model_name"+this.new_car_model_name);
    var newModel={

      car_model_name:this.new_car_model_name,
      car_make_id:this.car_make_id

    };
    this._carModelService.addCarModel(newModel).subscribe((result)=>{
      alert("New Car Model with name :"+result.body.car_model_name);
        this.new_car_model_name = "";
        this.loadCarMakes();
        this.loadCarModels(this.car_make_id);
        this.setDefaultState();
    },
    (error)=>{
      console.log("error in adding new car model"+error);
    }
    );
  }


  

  setDefaultState(): void {
    this.hideCarMakeDDL = false;
    this.hideCarModelDDL = false;
    this.hideCarModelText = true;
    this.hideEditText = true;
    this.hideAddText = true;
    this.hideSaveButton = true;
    this.hideCancelButton = true;
    this.hideEditButton = false;
    this.hideDeleteButton = false;
    this.hideAddButton = false;


  }
  setEditState(): void {

    this.commad_mode = "update";
    console.log("update===" + this.commad_mode);
    this.hideCarMakeDDL = true;
    this.hideCarModelDDL = true;
    this.hideCarModelText = true;
    this.hideEditText = false;
    this.hideAddText = true;

    this.hideSaveButton = false;
    this.hideCancelButton = false;
    this.hideEditButton = true;
    this.hideDeleteButton = true;
    this.hideAddButton = true;

  }


  cancelClick(): void {
    // this.car_model_name="";

    this.setDefaultState();
    this.onMakeSelect();
  }
  addClick(): void {

    this.commad_mode = "add";
    this.car_model_name = "";
    this.hideCarModelDDL = true;
    this.hideCarModelText = true;
    this.hideEditText = true;
    this.hideAddText = false;

    this.hideSaveButton = false;
    this.hideCancelButton = false;
    this.hideEditButton = true;
    this.hideDeleteButton = true;
    this.hideAddButton = true;

  }
  save(): void {

      console.log("new_model_name",this.new_car_model_name);
      // make sure that  user not sending empty model name while editing the model_name
      if (this.commad_mode == "update" && this.car_model_name!="") {

        console.log("update the car model");
        this.updateCarModel();
        this.setDefaultState();
        this.car_model_name = "";

      }
      // make sure that the user enter new model name 
      if (this.commad_mode == "add" && this.new_car_model_name!=="") {

        console.log("add new car model");
       // this.car_model_name =;
        this.addNewCarModel();
        
      }

    }

    deleteClick(){
   
    this.deleteCarModel(this.car_model_id);
    this.loadCarMakes();
   

  }
  
  onMakeSelect(): void {
    this.make_name=this.allCarMakes.find(x=>x._id==this.car_make_id).car_make;
    // var i = 0;
    // for (; i < this.allCarMakes.length; i++) {

    //   if (this.allCarMakes[i]._id == this.car_make_id) {

    //     this.make_name = this.allCarMakes[i].car_make;
    //   }
    // }

    this.loadCarModels(this.car_make_id);

  }

  onModelSelect(): void {
    console.log("model selected:" + this.car_model_id);
    this.car_model_name = this.allCarModels.find(x => x._id == this.car_model_id).car_model_name;
    console.log("model_name:" + this.car_model_name);
  }



}
