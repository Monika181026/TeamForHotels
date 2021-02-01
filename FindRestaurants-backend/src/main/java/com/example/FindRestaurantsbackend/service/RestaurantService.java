package com.example.FindRestaurantsbackend.service;

import com.example.FindRestaurantsbackend.domain.Restaurant;
import com.example.FindRestaurantsbackend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    //returns a list of Restaurants from the repository
    public List<Restaurant> findAllRestaurants() {
        return repository.findAll();
    }

    //return a specific Restaurant by id
    public Optional<Restaurant> findById(Integer id) {
        return repository.findById(id);
    }
}
