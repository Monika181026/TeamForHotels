import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interface/Restaurant'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly path = `http://localhost:8080/api`;
  constructor(private http: HttpClient) { }

  findAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.path}/restaurants`);
  }
  findById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.path}/${id}`);
  }

}
