import { Component, OnInit, enableProdMode } from "@angular/core";
import { CarAdService } from "./../services/carAd/carAd.service";
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";


import { Router } from "@angular/router";
@Component({
  
  templateUrl: "varify.number.component.html"
})
export class VarifyNumberComponent {
  pageTitle: string = "Varfiy number";
  message:any;
  code: any;


  constructor(private _carAdService: CarAdService, private router: Router) {}
  sendCode(): void {
    console.log("send code");
    console.log("code",this.code);
    this._carAdService.sendCode(this.code).subscribe(result=>{

      console.log(result);
      if(result.status_code==1){

        this.router.navigate(['/car_ads']);
      }
      else{

        this.message=result.message;
      }

    },(err)=>{
      console.log("error:",err);

    });
  } 
}
