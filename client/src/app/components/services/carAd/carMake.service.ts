import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ICarMakes } from '../../../entities/CarMakes';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';



@Injectable()
export class CarMakeService {
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
  
  getAllCarMake(): Observable < HttpResponse < ICarMakes[] >> {
    
    
    
    return this._http.get < ICarMakes[] > (this.baseUrl+"/CarMakes", {
      observe: 'response'
    })._catch(this.handleError);

  }
  updateCarMake(item:ICarMakes,_id:any):Observable<HttpResponse<ICarMakes>>{
      return this._http.put<ICarMakes>(this.baseUrl+"/CarMakes/"+_id,item,{observe:'response'})._catch(this.handleError);
  }
  addCarMake(make:any):Observable<HttpResponse<ICarMakes>>{
      
      return this._http.post<ICarMakes>(this.baseUrl+"/CarMakes/",make,{observe:'response'})._catch(this.handleError);
  }
  deleteCarMake(makeId:any):Observable<HttpResponse<any>>{
    return this._http.delete(this.baseUrl+"/CarMakes/"+makeId,{observe:'response'})._catch(this.handleError);
  }
}
