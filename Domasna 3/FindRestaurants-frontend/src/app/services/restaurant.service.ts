import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interface/Restaurant'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly path = `https://apprestaurants.herokuapp.com/api/restaurants`;
  constructor(private http: HttpClient) { }

  findAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.path}`);
  }
  findById(id: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.path}/${id}`);
  }

}
