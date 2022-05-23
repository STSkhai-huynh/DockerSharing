# Docker sharing demo source code #

## Overview ##
To demo how docker containers working with each other, I create a simple TodoApp system with 3 components: database, backend and frontend. This repo will containing all the source code of backend and frontend along with docker relating files

### Database ###
The database is a simple MySQL server running in container containing table name `my_db`. It will populated the Todo Item

### Backend ### 
A backend is a Java Application using spring boot as api server and containerized into `api_server` Docker image. It will public the `/todos` endpoint for accessing Todo Item

### Frontend ###
A Frontend is a Angular webapp accessing backend api containerized into `todo_app` Docker image. 

## Run Command

### Build the image ###
* To build backend image, go to `backend` folder and run: 

`docker build -f jar.Dockerfile --tag=api_server:latest .`
* To Build frontend image, go to `frontend` folder and run:

`docker build --build-arg APP_ENV=production -t todo_app:latest .`

### Run the container ###
* Create docker network:

`docker network create my_network`

* Create docker volume:

`docker volume create todo_db`
* To run the database container:

 `docker run --rm --name docker_db -e MYSQL_ROOT_PASSWORD=rootpassword  -e MYSQL_DATABASE=my_db -e MYSQL_USER=user -e MYSQL_PASSWORD=password  -p3306:3306  --network my_network -v todo_db:/var/lib/mysql -d mysql:8.0`
* To run the backend container:

`docker run --rm --name api_server -e MYSQL_HOST=docker_db -p8080:8080 -d api_server:latest`

* To run the front end container:

`docker run --rm --name todo_app  -e BACKEND_API_URL=localhost -e BACKEND_API_PORT=8080 -p4200:80 --network my_network -d todo_app:latest`

* To use docker compose to startup:

`docker-compose -f docker-compose.yml up -d`

### Docker Swarm ###

* Create network:

`docker network create my_network_o --driver overlay`

* Create Secret Storage:

`docker secret create mysql_user secrets/mysql_user.txt`

`docker secret create mysql_pass secrets/mysql_pass.txt`

* To create database service:

`docker service create --name docker_db --secret mysql_user --secret mysql_pass -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=my_db -e MYSQL_USER_FILE=//run/secrets/mysql_user -e MYSQL_PASSWORD_FILE=//run/secrets/mysql_pass -p3306:3306 --network my_network_o --mount type=volume,source=todo_db,target=//var/lib/mysql -d mysql:8.0`

* To create backend service:

`docker service create --name api_server -e MYSQL_HOST=docker_db -p8080:8080 --network my_network_o -d duckhai1/api_server:latest`

* To create frontend service:

`docker service create --name todo_app -e BACKEND_API_URL=localhost -e BACKEND_API_PORT=8080  -p4200:80 --network my_network_o duckhai1/todo_app:latest`

* To use docker stack to start up:

`docker stack deploy -c docker-compose-swarm.yml todoapp`

