# JWT with Angular 15 and Spring Boot 3 Demo

This project demonstrates the combination of Angular and Spring Boot. It uses JWT with Spring Security.

# Important notes

- This is a fork from [angular-springboot-demo](https://github.com/simasch/angular-springboot-demo), with a few updates to user MySQL instead of an in memory database. So, in order to correctly raise the project, the MySQL container needs to be up.
- MySQL credentials are exposed on both the docker-compose file and the application.properties file, but for our purpose, it's not relevant.
- Follow [this link](https://martinelli.ch/angular-15-spring-boot-3-and-jwt/) to go to the project's guide (except for the MySQL implementation)
- For the MySQL implementation (and Authentication configuration to work with it), pls look at `application.properties` and `SecurityConfiguration.java` files

# How to raise the project

1. From the project root, run `docker-compose up` (or `docker compose up`, depending on your system) to raise the DB container
2. To raise the Back End, go to the backend folder and run `mvn spring-boot:run`
3. To raise the Front End, go to the frontend folder, install dependencies (`npm install`) and run `npm start` (or `ng serve`)
4. Open **[the local app](localhost:4200)** in your browser 