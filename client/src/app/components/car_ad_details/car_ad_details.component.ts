
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { Jsonp } from '@angular/http';
import { CarAdService } from './../services/carAd/carAd.service';
import {environment} from '../../../environments/environment'
@Component({
  
  templateUrl: 'car_ad_details.component.html'
 })
export class CarAdDetailsComponent implements OnInit {
  pageTitle: string = "Details of the car ad";
  carAd: any;
  carPics: any[];
  selectedPic: string;
  currentPicIndex: number = 0;
  isDataLoaded: boolean = false;
  image_baseUrl:string;

  constructor(private router: Router, private route: ActivatedRoute, private _service: CarAdService) {

    //this.carAd=null;

    this.image_baseUrl=environment.image_baseUrl;
  }
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this._service.getCarAdById(id).subscribe(result => {
      this.carAd = result;
      this.isDataLoaded = true;
      this.selectedPic = this.carAd.car_image[0];


    },
      error => {
        console.log("Could not find the CarAd with id" + id);

      });
  }

  setPicture(event) {
    this.selectedPic = event;

  }
  nextPic() {


    if (this.currentPicIndex < this.carAd.car_image.length - 1) {

      console.log(" Before currentIndex:" + this.currentPicIndex);
      this.currentPicIndex++;
      console.log(" After currentIndex:" + this.currentPicIndex);
      this.selectedPic = this.carAd.car_image[this.currentPicIndex];
    }
  }
  prevPic() {

    if (this.currentPicIndex > 0) {
      console.log(" Prev Button Before currentIndex:" + this.currentPicIndex);
      this.currentPicIndex--;
      console.log(" Prev Button after currentIndex:" + this.currentPicIndex);
      this.selectedPic = this.carAd.car_image[this.currentPicIndex];

    }

  }

}








