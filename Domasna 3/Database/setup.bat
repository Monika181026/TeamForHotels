@echo off
setlocal EnableDelayedExpansion
set PGPASSWORD=postgres&& "C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -f "CREATE_RESTAURANT_TABLE.sql" postgres
set PGPASSWORD=postgres&& "C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -c "CALL CREATE_RESTAURANT_TABLE();" postgres
set PGPASSWORD=postgres&& "C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -f "INSERT_INTO_RESTAURANT_TABLE.sql" postgres	
for /f "usebackq tokens=1-4 skip=1 delims=," %%a in ("hotels-filtered.txt") do (
     set PGPASSWORD=postgres&& "C:\Program Files\PostgreSQL\13\bin\psql.exe" -U postgres -c "CALL INSERT_INTO_RESTAURANT_TABLE(%%a,%%b,'%%c',%%d);" postgres )