import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  Jsonp
} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {
  ICarMakes
} from './../../../entities/CarMakes';
import { environment } from '../../../../environments/environment';
@Injectable()
export class CarAdService {

  baseUrl:string;
  constructor(private _http: Http) {
    console.log("baseUrl:"+environment.baseUrl);
    this.baseUrl=environment.baseUrl;

  }
  sendCode(code: any): any {
    return this._http.get(this.baseUrl+"/CarAds/varify_number/" + code).pipe(map(
      (res: any) => res.json())

    );
  }
  
  getCarManufactureList(): Observable < any[] > {
   
    return this._http.get(this.baseUrl+"/carmakes")
      .pipe(
         map((response: Response) => < ICarMakes[] > response.json())
      ).
        _catch(this.handleError);
  }

  private handleError(error: Response): Observable < ICarMakes[] > {
    
    return Observable.throw(error.json().error || "Server Error");

  }
  private handleError2(error: Response): Observable < ICarMakes[] > {

    return Observable.throw(error.json());

  }
  getCarModals(id: String): Observable < any[] > {

    return this._http.get(this.baseUrl+"/CarModels?car_make_id="+id)
      .pipe(map((response: Response) => < any[] > response.json()));

  }
  saveCarAd(model) {

    return this._http.post(this.baseUrl+"/CarAds", model)
      .pipe(map((response: Response) => response.json()));
  }
  getCarAds(): Observable < any[] > {

    return this._http.get(this.baseUrl+"/CarAds").pipe(map((res: Response) => < any[] > res.json()));
  }
  getActiveCarAds(state ? : Boolean): Observable < any[] > {

    if (state == null) {

      state = true;
    }

    return this._http.get(this.baseUrl+"/CarAds/active/" + state).pipe(map((res: Response) => < any[] > res.json()));
  }
  getCarAdById(id: string): Observable < any > {
    return this._http.get(this.baseUrl+"/CarAds/" + id).pipe(map((res: Response) => < any > res.json()));
  }

  updateCarAd(entity, id) {
    var requestOptions = new RequestOptions()
    return this._http.put(this.baseUrl+"/CarAds/" + id, entity).pipe(map((res: Response) => < any > res.json()));
  }
  deleteCarAd(id) {
   
    var requestOptions = new RequestOptions()
    return this._http.delete(this.baseUrl+"/CarAds/" + id).pipe(map((res: Response) => <any> res.json()));
  }
}
