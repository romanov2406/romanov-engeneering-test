This repository contains two projects: **engineering-test and task-romanov**, both running in Docker containers on the same network.

Steps to Set Up the Projects:
Clone the repository:

1. Clone the repository using Git by running the command: git clone https://github.com/romanov2406/romanov-engeneering-test.git
   

2. Start the Docker containers:
   *  Navigate to the project directory: Change into the engineering-test directory by running: **cd engineering-test**. Then, bring up the Docker 
      containers using the following
     command: **docker-compose up -d --force-recreate**.
   * On some Docker versions, you may need to use docker compose instead of docker-compose.
   * Run the database seed: After the containers are up,
     run the following command to seed the database: **docker exec -it engineering-test_eurocamp-api_1 npm run seed:run**
   * If the container name is different, check the correct name by using docker ps.
   * Check that there is data in the database tables (see below for connection details). Also review the api documentation at http://localhost:3001/api

3. Check Test Code: Navigate to the **task-romanov** folder. The test task and unit tests are included in the Docker container. The image name is:**engineering-test-romanov-service-1.**.
4. All notes regarding the test task are in the engineering-test folder under NOTES.md.
