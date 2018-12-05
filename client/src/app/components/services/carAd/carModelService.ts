import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ICarMakes } from '../../../entities/CarMakes';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';



@Injectable()
export class CarModelService {
    baseUrl:string;
    constructor(private _http: HttpClient) {
        this.baseUrl=environment.baseUrl;
    }  
    
    private handleError(error: HttpErrorResponse) {
    let errMessage;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      /* console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`); */
      errMessage.status = error.status;
      errMessage.message = error.error;
    }
    // return an observable with a user-facing error message
    return throwError(
      errMessage);
      
  };

  getCarModelsByMakeId(id: String): Observable <HttpResponse <any[]> > {

    return this._http.get<ICarModel[]>(this.baseUrl+"/CarModels?car_make_id="+id,{observe:'response'});
  
  }
  getAllCarModels(): Observable < HttpResponse < ICarModel[] >> {
    
    
    
    return this._http.get < ICarModel[] > (this.baseUrl+"/CarModels", {
      observe: 'response'
    })._catch(this.handleError);

  }
  updateCarModel(item:any,_id:any):Observable<HttpResponse<ICarModel>>{
    console.log(item);
      return this._http.put<ICarModel>(this.baseUrl+"/CarModels/"+_id,item,{observe:'response'})._catch(this.handleError);
  }
  addCarModel(carModel:any):Observable<HttpResponse<ICarModel>>{
      
      return this._http.post<ICarModel>(this.baseUrl+"/CarModels/",carModel,{observe:'response'})._catch(this.handleError);
  }
  deleteCarModel(_id:any):Observable<HttpResponse<any>>{
    return this._http.delete(this.baseUrl+"/CarModels/"+_id,{observe:'response'})._catch(this.handleError);
  }
}
interface ICarModel{

 car_model_name:string;
 car_make_id:string;
 _id:string;



}