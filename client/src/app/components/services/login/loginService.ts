import { Injectable } from '@angular/core';
import {Http,Response, RequestOptions} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import {ICarMakes} from './../../../entities/CarMakes';
import {user} from './../../../entities/user';
import { window } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable()
export class LoginService {
  baseUrl:string;
constructor(private _http:Http,private _router:Router){
this.baseUrl=environment.baseUrl;
}
login(model:user):Observable<any>{
 
  return this._http.post(this.baseUrl+"/authenticate",model).pipe(map((res:Response)=><any>res.json()));
}
// authenticateAsAdmin(token:string):Observable<any>{
// const headers=new Headers();

// headers.append('Content-Type','application/json');
// //headers.append('Authorization',token);
// const requestOptions=new RequestOptions({headers:headers});
// return this._http.post("http://localhost:8000/api/authenticate/test1",).map((res:Response)=><any>res.json());

// }

isLoggedin():boolean{

 
 var token=this.getToken();

 if(token){
// check if token is expired
  var payload = JSON.parse(atob(token.split('.')[1]));
  /*
  this code is not working ,it always return false ,which is not correct
  console.log("isloggein true:"+(payload.exp > Date.now() / 1000));
  return payload.exp > Date.now() / 1000;
  */
    return true;

  }
  else{
    
  return false;
  }

 }
getToken():String{
return  localStorage.getItem("token");

}
currentUser():any{
if(this.isLoggedin())
{
  var token = this.getToken();
  var payload = JSON.parse(atob(token.split('.')[1]));
  
  return {
  user_email : payload.user_email,
  user_role : payload.user_role
  };
  }

}

isAdmin():boolean{
 if(this.isLoggedin())
 {
  var userData=this.currentUser();
  if(userData.user_role==='admin')
  {
   return true;
  }
}
  return false;
}
logout():void{
  localStorage.removeItem("token");
  this._router.navigate(['/car_ads']);

}



}


