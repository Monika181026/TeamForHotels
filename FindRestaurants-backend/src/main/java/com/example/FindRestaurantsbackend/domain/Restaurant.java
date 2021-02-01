package com.example.FindRestaurantsbackend.domain;

import javax.persistence.*;

@Entity
@Table(schema = "public", name = "restaurant")
public class Restaurant {
    //id Restaurant primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //longitude coordinate
    @Column(name = "lon")
    private double lon;

    //latitude coordinate
    @Column(name = "lat")
    private double lat;

    //Restaurant name
    @Column(name = "name")
    private String name;

    //Restaurant rating
    @Column(name = "rating")
    private double rating;

    public Restaurant() {
    }

    public Restaurant(double lon, double lat, String name, double rating) {
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
