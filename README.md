# AE-Chess

This project is a Full Stack experiment. It's divided in two main parts:

- The client, a ReactJS application that displays a responsive chessboard on the screen, where we can select the first position of the Knight piece and let us move it on the board by using its "L" rule. It also has a button where we can highlight the next possible moves in two turns.
- The server, a NodeJS application using a REST api with a single endpoint `http://localhost:8080/?pos=A1`. This endpoint expects the current coordinate of the knight to return next possible moves in two turns.

This project use `docker-compose`. So, to run it, you need the docker installed on your local machine.

## Running

- `docker-compose up --build`
- Go to `http://localhost:3000/`
- Tap in a cell to start

## Testing

This projects uses Unit Tests and E2E Tests.

The Unit Tests were built with `mocha` and `chai` and they are used to test the API.

The E2E tests were built with `Jest` and `Puppeteer` to test the client running on a virtual browser.

- To run the Unit Tests, run the following command: `docker-compose run server npm test`
- To run the E2E Tests, run the following command: `docker-compose run client npm run test`
