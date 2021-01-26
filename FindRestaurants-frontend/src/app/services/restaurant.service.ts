import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interface/Restaurant'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//This service is used for communication with the Restaurant api microservice
export class RestaurantService {
  //default RestController path
  private readonly path = `http://localhost:8080/api/restaurants`;
  constructor(private http: HttpClient) { }

  //Return all restaurant from the repository
  findAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.path}`);
  }

  //input parametar id: the id of the Restaurant
  //returns a specific restaurant by id
  findById(id: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.path}/${id}`);
  }

}
