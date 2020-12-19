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

  refreshMap(){
    this.map.removeObjects(this.map.getObjects());
    this.filteredRestaurants.forEach(value=>{
      let marker = new H.map.Marker({ lat: value.lat, lng: value.lon});
      this.map.addObject(marker);
    });
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
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
    this.map.setZoom(14);
    window.addEventListener('resize', () => this.map.getViewPort().resize());
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

  onOpenRestaurant(id: Number): void {
    this.router.navigate([`restaurants/details/${id}`]);
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

  filterData() {
    this.filterByName();
    this.filterByRating();
  }

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

  filterByName() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      return this.restaurantName != null ? (restaurant.name.includes(this.restaurantName)) : true;
    });
  }
}