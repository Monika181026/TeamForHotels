package com.example.FindRestaurantsbackend.api;

import com.example.FindRestaurantsbackend.mapper.RestaurantMapper;
import com.example.FindRestaurantsbackend.response.RestaurantResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:4200")
public class RestaurantController {
    private final RestaurantMapper mapper;

    public RestaurantController(RestaurantMapper mapper) {
        this.mapper = mapper;
    }

    //Returns a list of all Restaurants
    @GetMapping
    public List<RestaurantResponse> findAllRestaurants() {
        return mapper.getAllRestaurants();
    }

    //Returns a specific Restaurant
    //Requires id value
    @GetMapping("/{id}")
    public RestaurantResponse findById(@PathVariable Integer id) {
        return mapper.getRestaurant(id);
    }
}
