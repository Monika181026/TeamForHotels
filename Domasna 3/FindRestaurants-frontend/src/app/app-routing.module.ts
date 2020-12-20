import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-details/restaurant-details.component';

import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
}, {
  path: '',
  redirectTo: 'home', pathMatch: 'full'
},{
  path: 'restaurants',
  component: RestaurantComponent
},{
  path: 'restaurants/details/:id',
  component: RestaurantDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
