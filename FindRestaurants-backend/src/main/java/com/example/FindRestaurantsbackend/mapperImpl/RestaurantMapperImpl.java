package com.example.FindRestaurantsbackend.mapperImpl;

import com.example.FindRestaurantsbackend.converter.RestaurantConverter;
import com.example.FindRestaurantsbackend.domain.Restaurant;
import com.example.FindRestaurantsbackend.mapper.RestaurantMapper;
import com.example.FindRestaurantsbackend.response.RestaurantResponse;
import com.example.FindRestaurantsbackend.service.RestaurantService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantMapperImpl implements RestaurantMapper {
    private final RestaurantService service;
    private final RestaurantConverter converter;

    public RestaurantMapperImpl(RestaurantService service, RestaurantConverter converter) {
        this.service = service;
        this.converter = converter;
    }

    @Override
    public List<RestaurantResponse> getAllRestaurants() {
        return converter.convertListRestaurantsToListRestaurantResponse(service.findAllRestaurants());
    }

    @Override
    public RestaurantResponse getRestaurant(int id) {
        Restaurant restaurant = Optional.of(service.findById(id)).get()
                .orElseThrow(() -> new EntityNotFoundException("Entity with id: " + id + " does not exist!"));
        return converter.convertRestaurantToRestaurantResponse(restaurant);
    }

}
