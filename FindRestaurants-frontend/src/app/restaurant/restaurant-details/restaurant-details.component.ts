import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Restaurant } from 'src/app/interface/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
restaurant:Restaurant;
  constructor(private route: ActivatedRoute, private service: RestaurantService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        //get the id for the Restaurant from paramMa
        let v=params.get('id');
        //call the service to get the details for the specific Restaurant
        return this.service.findById(params.get('id'));
      })
     ,).subscribe(restaurant => {       
        this.restaurant=restaurant;
      });
  }
}
