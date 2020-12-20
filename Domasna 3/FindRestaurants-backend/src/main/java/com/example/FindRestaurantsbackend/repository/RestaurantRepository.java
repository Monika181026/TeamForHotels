package com.example.FindRestaurantsbackend.repository;

import com.example.FindRestaurantsbackend.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{}
