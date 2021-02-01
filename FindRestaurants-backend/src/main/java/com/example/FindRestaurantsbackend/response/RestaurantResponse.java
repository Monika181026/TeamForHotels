package com.example.FindRestaurantsbackend.response;

public class RestaurantResponse {
    private int id;
    private double lon;
    private double lat;
    private String name;
    private double rating;

    public RestaurantResponse(int id, double lon, double lat, String name, double rating) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.name = name;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
