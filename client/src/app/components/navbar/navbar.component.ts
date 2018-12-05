
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login/loginService";
import { Observable } from 'rxjs/Observable';
@Component({
 
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
  branding: string = "MCZ";
  isAuthenticaAsAdmin:boolean;
  isAuthenticated:boolean;
  constructor(private _loginService: LoginService) {
  }
  ngOnInit():void{
   
  }

  isLoggedin():boolean{
   return this._loginService.isLoggedin();

  }
  isAdmin():boolean{

    return this._loginService.isAdmin();

  }
  logout():void{

    this._loginService.logout();
  }
 
}