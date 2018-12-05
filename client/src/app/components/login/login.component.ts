

import { Component, OnInit, enableProdMode, ViewContainerRef } from '@angular/core';

import {FormGroup,FormsModule,FormControl,ReactiveFormsModule}  from '@angular/forms';

import { LoginService } from '../services/login/loginService';
import { Router } from '@angular/router';

import { routerNgProbeToken } from '@angular/router/src/router_module';
import { user } from './../../entities/user';

@Component({

templateUrl:'login.component.html'

})
export class LoginComponent{
  pageTitle:string="Login ";
  isProcessing:boolean;
  errMessage:string;
  entity:user=new user();
  constructor(
    private _loginService:LoginService,
    private router:Router
  
  ){
  }
  showSuccess() {
    
  }

  showError() {
    console.log("showError");
    
  }

  showWarning() {
    
  }

  showInfo() {
    
  }
  
 login():void{
   // email: isrardk, pwd:admin
console.log("entity:"+this.entity);
 this._loginService.login(this.entity).subscribe( result=>{
  console.log(result.status);
  
  switch(result.status)
  {
  case 1:
   this.errMessage=result.message;
  
  break;

 case 2:
  this.errMessage=result.message;
 break;

 case 200:

  localStorage.setItem("token",result.token);
  this.router.navigate(['\admin']);
  break;
case 501:
this.errMessage=result.message;
break;
 }

  },
   error=>{
    console.log("error occured");

   });

}

}
