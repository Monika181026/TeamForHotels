CREATE PROCEDURE INSERT_INTO_RESTAURANT_TABLE(lon double precision, lat double precision, name varchar(100), rating double precision)
LANGUAGE SQL
AS $$
INSERT INTO restaurant (lon,lat,name,rating) VALUES(lon,lat,name,rating);
$$;