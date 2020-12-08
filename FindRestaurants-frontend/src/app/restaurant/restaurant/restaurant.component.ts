import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/interface/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  ratingOneTwo = false;
  ratingTwoThree = false;
  ratingThreeFour = false;
  ratingFourFive = false;
  restaurantName: string | null = null;
  rating: Array<string> | null = new Array;
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  constructor(private router: Router, private route: ActivatedRoute, service: RestaurantService) {
    service.findAllRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      console.log(restaurants);
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      this.restaurantName = paramMap.get('restaurantName');
      this.validateRating(paramMap.get('rating'));
    })
  }

  onSubmit(): void {
    this.initRouterParams();
    this.router.navigate([], {
      queryParams: {
        restaurantName: this.restaurantName,
        rating: this.rating?.toString()
      },
      queryParamsHandling: "merge"
    });
    
  }

  validateRating(rating: string | null) {
    rating?.split(',').forEach(value => {
      if (value === 'one') {
        this.ratingOneTwo = true;
      }
      if (value === 'two') {
        this.ratingTwoThree = true;
      }
      if (value === 'three') {
        this.ratingThreeFour = true;
      }
      if (value === 'four') {
        this.ratingFourFive = true;
      }
    })
  }

  initRouterParams() {
    let arrRating: Array<string> | null = new Array;
    if (this.ratingOneTwo === true) {
      arrRating.push('one');
    }
    if (this.ratingTwoThree === true) {
      arrRating.push('two');
    }
    if (this.ratingThreeFour === true) {
      arrRating.push('three');
    }
    if (this.ratingFourFive === true) {
      arrRating.push('four');
    }
    if (arrRating.length == 0) {
      arrRating = null;
    }
    if (this.restaurantName === "") {
      this.restaurantName = null;
    }
    this.rating = arrRating;
  }

}