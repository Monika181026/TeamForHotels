package com.example.FindRestaurantsbackend.converter;

import com.example.FindRestaurantsbackend.domain.Restaurant;
import com.example.FindRestaurantsbackend.response.RestaurantResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RestaurantConverter {
    public RestaurantResponse convertRestaurantToRestaurantResponse(Restaurant restaurant) {
        return new RestaurantResponse(restaurant.getId(),
                restaurant.getLon(),
                restaurant.getLat(),
                restaurant.getName(),
                restaurant.getRating());
    }

    public List<RestaurantResponse> convertListRestaurantsToListRestaurantResponse
            (List<Restaurant> restaurants) {
        ArrayList<RestaurantResponse> restaurantResponses = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            restaurantResponses.add(convertRestaurantToRestaurantResponse(restaurant));
        }
        return restaurantResponses;
    }
}
