# Flight Finder with React

## A simple application to search for flight data

## Overview

The application allow the user to search for flights.
The server has been created using Node.js, with the data stored on MongoDB (MongoDB Atlas).
The client uses React to interact with the APIs.
Four APIs created:

- /api/flights
- /api/flightsReturn
- /api/departureCities
- /api/destinationCities

## Tech

Flight Finder uses a number of open source projects to work properly:

- [React] - A frontend framework!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [MongoDB Atlas] - A cloud No SQL database

And of course Dillinger itself is open source with a [public repository][dill]
on GitHub.

## Installation

Flight Finder requires [Node.js](https://nodejs.org/) v20 to run.
It also requires React and a MongoDB Atlas account.

For the assessment purpose, a MongoDB Atlas database has been already created and the URL has been added in the config.env. If you want to use your MongoDB Atlas account, please create a collection and add the URL in the config.env file. A json file (test.flights.json) with the flight data has been provided in the server folder, so it can be imported in the MongoDB collection created.

Install the dependencies and start the server.

```sh
cd flight-finder-server
npm i
npm start
```

For test environments...

```sh
cd flight-finder-server
npm i
node run dev
```

Install the dependencies and start the client.

```sh
cd flight-finder-client
npm i
npm start
```

The client will be available on:
http://localhost:3000/

The server will be run on:
http://localhost:3001/

### Created by Simone Susino
