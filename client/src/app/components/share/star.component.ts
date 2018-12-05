
import { Component, Input, OnChanges } from "@angular/core";

@Component({
 
 selector:'ai-star',
 templateUrl:'star.component.html'

})

export class StarComponent{
@Input() Rating:number;
starWidth:number;
ngOnChange() {
    console.log("Hi...........");
this.starWidth= (this.Rating* 50)/5;
console.log(this.starWidth);
}


}