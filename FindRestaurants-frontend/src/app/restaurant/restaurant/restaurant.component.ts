import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/interface/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { switchMap} from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @ViewChild("map")
  public mapElement: ElementRef;
  private platform: any;
  map:any;
  ratingOneTwo = false;
  ratingTwoThree = false;
  ratingThreeFour = false;
  ratingFourFive = false;
  restaurantName: string | null = null;
  rating: Array<string> | null = new Array;
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];


  constructor(private router: Router, private route: ActivatedRoute, private service: RestaurantService) {
    this.platform = new H.service.Platform({
      "apikey": "MN8C1R3UIgtvsAfJvR4XfY0xP4yWwclrGOv0xMEf298"
    });
  }

  ngOnInit(): void {
    //call service to get all Restaurants
    //subscribe to queryParamMap after the service returns the Restaurants
    //filter and Refresh the data every time the user uses the filters
    this.service.findAllRestaurants().pipe(
      switchMap(restaurants => {
        this.restaurants = restaurants;
        this.filteredRestaurants = restaurants;
        return this.route.queryParamMap;
      }),
    ).subscribe(paramMap => {
      this.restaurantName = paramMap.get('restaurantName');
      this.validateRating(paramMap.get('rating'));
      this.filterData();
      this.refreshMap();
    });
  }

  //This method removes all objects from the map and puts new markers for each filtered object
  refreshMap(){
    this.map.removeObjects(this.map.getObjects());
    this.filteredRestaurants.forEach(value=>{
      let marker = new H.map.Marker({ lat: value.lat, lng: value.lon});
      this.map.addObject(marker);
    });
  }

  //after the View has been initialized we want to initialize the map
  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    //init the map and center to Macedonia
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 41.9962697, lng: 21.4328716 },
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    var ui = H.ui.UI.createDefault(this.map, defaultLayers);
    //zoom the map to Skopje
    this.map.setZoom(14);
    //add event listener so the user can interact with the map
    window.addEventListener('resize', () => this.map.getViewPort().resize());
  }

  //this method is called when users submits the filters
  onSubmit(): void {
    this.initRouterParams();
    //navigate to the same route with different parametars
    this.router.navigate([], {
      queryParams: {
        restaurantName: this.restaurantName,
        rating: this.rating?.toString()
      },
      queryParamsHandling: "merge"
    });
  }

  //this method is called when the user clicks on a restaurant item
  //input parametar id: the id of the restaurant
  onOpenRestaurant(id: Number): void {
    //navigates to the Restaurant Details page
    this.router.navigate([`restaurants/details/${id}`]);
  }

  //this method is called to validate the rating
  //one,two,three and four are the values for our 4 radio buttons
  //ex: if the value one exists then the radio button ratingOneTwo is set to true
  //input parametar rating or null
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

  //this method prepares the values we use as parametars in the navigation
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

  filterData() {
    this.filterByName();
    this.filterByRating();
  }

  //filters all restaurants by Rating
  filterByRating() {
    if (this.ratingOneTwo || this.ratingTwoThree || this.ratingThreeFour || this.ratingFourFive) {
      this.filteredRestaurants = this.filteredRestaurants.filter(restaurant => {
        return (this.ratingOneTwo && restaurant.rating >= 1 && restaurant.rating <= 2) ||
               (this.ratingTwoThree && restaurant.rating >= 2 && restaurant.rating <= 3) ||
               (this.ratingThreeFour && restaurant.rating >= 3 && restaurant.rating <= 4) ||
               (this.ratingFourFive && restaurant.rating >= 4 && restaurant.rating <= 5)
      });
    }
  }

  //filters all restaurants by name
  filterByName() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      return this.restaurantName != null ? (restaurant.name.includes(this.restaurantName)) : true;
    });
  }
}