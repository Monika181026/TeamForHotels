import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  ratingOneTwo=false;
  ratingTwoThree=false;
  ratingThreeFour=false;
  ratingFourFive=false;
  constructor() { }

  ngOnInit(): void {
  }
  Submit():void{
    console.log('clicked');
  }

}
