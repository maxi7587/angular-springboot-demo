# JWT with Angular 15 and Spring Boot 3 Demo

This project demonstrates the combination of Angular and Spring Boot. It uses JWT with Spring Security.

# Important notes

- This is a fork from [angular-springboot-demo](https://github.com/simasch/angular-springboot-demo), with a few updates to user MySQL instead of an in memory database. So, in order to correctly raise the project, the MySQL container needs to be up.
- MySQL credentials are exposed on both the docker-compose file and the application.properties file, but for our purpose, it's not relevant.

# How to raise the project

1. From the project root, run `docker-compose up` (or `docker compose up`, depending on your system) to raise the DB container
2. To raise the Back End, go to the backend folder and run `mvn spring-boot:run`
3. To raise the Front End, go to the frontend folder, install dependencies (`npm install`) and run `npm start` (or `ng serve`)
4. Open **localhost:4200** in your browser 