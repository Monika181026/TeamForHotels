import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-details/restaurant-details.component';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';

const routes: Routes = [{
  //HomeComponent route at /home
  path: 'home',
  component: HomeComponent
}, {
  //Default route that re-routes to /home (HomeComponent)
  path: '',
  redirectTo: 'home', pathMatch: 'full'
},{
  //RestaurantComponent route at /restaurants
  path: 'restaurants',
  component: RestaurantComponent
},{
  //RestaurantDetailsComponent route at restaurants/details/{id}
  path: 'restaurants/details/:id',
  component: RestaurantDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
