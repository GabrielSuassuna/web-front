### How to run my PostgreSQL container?
    
    docker run -d -p 5433:5432 --name liven -e POSTGRES_USER=liven -e POSTGRES_PASSWORD=liven --mount src=db-blog,dst=/var/lib/postgresql/data postgres

### How to access my PostgreSQL container?

    1. docker ps
    2. Take the container ID
    3. docker exec -it CONTAINER_ID bash
    4. psql -U liven
    5. Execute your psql queries. Don't forget the ; in the end