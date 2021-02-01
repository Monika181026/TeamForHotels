package com.example.FindRestaurantsbackend.mapper;

import com.example.FindRestaurantsbackend.response.RestaurantResponse;

import java.util.List;

public interface RestaurantMapper {
     List<RestaurantResponse> getAllRestaurants();
     RestaurantResponse getRestaurant(int id);
}
