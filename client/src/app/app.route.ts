import { Routes } from "@angular/router";
import { CarAdDetailsComponent } from "./components/car_ad_details/car_ad_details.component";
import { LoginComponent } from "./components/login/login.component";
import { NewCarAdComponent } from "./components/new_car_ad/new_car_ad.component";
import { CarAdsComponent } from "./components/car_ads/car_ads.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutUsComponent } from "./components/about_us/about_us.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./auth.guard";
import { AdminComponent } from "./components/admin/admin.component";
import { AllCarAdsComponent } from "./components/admin/all_car_ads/all_car_ads.component";
import { AllActiveCarAdsComponent } from "./components/admin/all_active_car_ads/all_active_car_ads.component";
import { AllInActiveCarAdsComponent } from "./components/admin/all_in_active_car_ads/all_in_active_car_ads.component";
import { VarifyNumberComponent } from "./components/varify.number/varify.number.component";
import { AllCarMakesComponent } from 'src/app/components/admin/all_car_makes/all_car_makes.component';
import { AllCarModelsComponent } from "./components/admin/all_car_models/all_car_models.component";
export const ROUTE: Routes = [
  { path: "car_ad_details/:id", component: CarAdDetailsComponent },
  { path: "login", component: LoginComponent },
  { path: "new_car_ad", component: NewCarAdComponent },
  { path: "varify_number", component: VarifyNumberComponent },

  { path: "car_ads", component: CarAdsComponent },
  { path: "about_us", component: AboutUsComponent },

  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "home", component: HomeComponent },
  { path: "", component: CarAdsComponent},
  {
    path: "admin",
    component: AdminComponent,
     canActivate:[AuthGuard],
    children: [
      { path: "", component: AllCarAdsComponent },
      { path: "all_car_ads", component: AllCarAdsComponent },
      { path: "all_active_car_ads", component: AllActiveCarAdsComponent },
      { path: "all_in_active_car_ads", component: AllInActiveCarAdsComponent },
      { path: "all_car_makes", component: AllCarMakesComponent },
      { path: "all_car_models", component: AllCarModelsComponent }
    ]
  }
];
