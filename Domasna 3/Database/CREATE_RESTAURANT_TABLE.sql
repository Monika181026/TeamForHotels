DROP TABLE IF EXISTS restorani;
CREATE TABLE restorani(
lon double precision not null,
lat double precision not null,
name varchar(100) not null,
rating double precision not null,
PRIMARY KEY (name)
);
