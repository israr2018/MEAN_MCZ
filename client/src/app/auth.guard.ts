import { Injectable } from '@angular/core';
import { Router,Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './components/services/login/loginService';
import { Observable } from 'rxjs/Observable';
import { ProfileComponent } from './components/profile/profile.component';
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private _loginService:LoginService,private router:Router){

    }
       canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(localStorage.getItem("token")){
            
            return true;
           }
           else{
              
              this.router.navigate(['/login']);
            return false;
           }
    }
   
   
    
}
