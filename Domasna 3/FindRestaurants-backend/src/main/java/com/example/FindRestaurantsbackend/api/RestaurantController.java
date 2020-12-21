package com.example.FindRestaurantsbackend.api;

import com.example.FindRestaurantsbackend.domain.Restaurant;
import com.example.FindRestaurantsbackend.service.RestaurantService;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "https://teamforrestaurants.netlify.app")
public class RestaurantController {
    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Restaurant> findAllRestaurants() {
        return service.findAllRestaurants();
    }

    @GetMapping("/{id}")
    public Restaurant findById(@PathVariable Integer id) {
        return Optional.of(service.findById(id)).get()
                .orElseThrow(() -> new EntityNotFoundException("Entity with id: "+id+" does not exist!"));
    }
}
