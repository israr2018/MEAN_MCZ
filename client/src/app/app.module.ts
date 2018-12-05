import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {CarAdsFilterPipe} from  './components/car_ads/car_ads_filter';
import {StarComponent} from  './components/share/star.component';
import { ROUTE } from './app.route';

import { CarAdDetailsComponent } from "./components/car_ad_details/car_ad_details.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { NewCarAdComponent } from "./components/new_car_ad/new_car_ad.component";
import { CarAdsComponent } from "./components/car_ads/car_ads.component";
import { AboutUsComponent } from './components/about_us/about_us.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarAdService } from "./components/services/carAd/carAd.service";
import { LoginService } from './components/services/login/loginService';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { AllCarAdsComponent } from './components/admin/all_car_ads/all_car_ads.component';
import { AllActiveCarAdsComponent } from './components/admin/all_active_car_ads/all_active_car_ads.component';
import { AllInActiveCarAdsComponent } from './components/admin/all_in_active_car_ads/all_in_active_car_ads.component';
import { VarifyNumberComponent } from '././components/varify.number/varify.number.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationService } from './components/services/pagination/pagination.service';
import { AllCarMakesComponent } from 'src/app/components/admin/all_car_makes/all_car_makes.component';
import { CarMakeService } from './components/services/carAd/carMake.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllCarModelsComponent } from './components/admin/all_car_models/all_car_models.component';
import { CarModelService } from './components/services/carAd/carModelService';

@NgModule({
  imports: [
 
  BrowserModule,
    HttpModule,
    HttpClientModule,
    
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forRoot(ROUTE)
      
  ],
  declarations: [
    AppComponent,
    CarAdsFilterPipe,
    StarComponent,
    NavbarComponent,
    CarAdDetailsComponent,
    LoginComponent,
    HomeComponent,
    NewCarAdComponent,
    CarAdsComponent,
    AboutUsComponent,
    
    ProfileComponent,
    AdminComponent,
    AllCarAdsComponent,
    AllActiveCarAdsComponent,
    AllInActiveCarAdsComponent,
    AllCarMakesComponent,
    AllCarModelsComponent,
    VarifyNumberComponent,
    BannerComponent,
    FooterComponent
    ],
  providers: [CarAdService,LoginService,AuthGuard,PaginationService,CarMakeService,CarModelService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
