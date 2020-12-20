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

    public List<Restaurant> findAllRestaurants() {
        return repository.findAll();
    }

    public Optional<Restaurant> findById(Integer id) {
        return repository.findById(id);
    }
}
