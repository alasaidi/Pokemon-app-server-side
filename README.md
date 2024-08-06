# Pokémon App Server

This is the server-side component of the Pokémon React application. It provides the backend API for managing players, Pokémon, and player-Pokémon relationships.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
5. [Models](#models)
6. [Controllers](#controllers)
7. [Middleware](#middleware)
8. [Environment Variables](#environment-variables)
9. [Running the Server](#running-the-server)

## Overview

This server-side application works in conjunction with a client-side React application to create a full-stack Pokémon management system. 

### Related Repositories

- **Client-side Repository**: [[Link to the client-side repository](https://github.com/alasaidi/Pokemon-react-app-ui)]

Please refer to the client-side repository for instructions on setting up and running the front-end of the application.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (see [Environment Variables](#environment-variables))
4. Start the server: `npm start`

## Project Structure

```
POKEMON-APP-SERVER-SIDE/
├── controllers/
│   ├── player-pokemon.controller.js
│   ├── player.controller.js
│   └── pokemon.controller.js
├── middleware/
│   ├── auth.js
│   └── verifyToken.js
├── models/
│   ├── player.model.js
│   ├── playerPokemon.model.js
│   └── pokemon.model.js
├── routes/
│   ├── player.route.js
│   ├── playerPokemon.js
│   └── pokemon.route.js
├── utils/
│   └── hashPassword.js
├── .env
├── .gitignore
├── data.json
└── index.js
```

## API Endpoints

### Players
- POST `/players/api`: Register a new player
- POST `/players/api/login`: Login a player
- GET `/players/api/logout`: Logout a player
- GET `/players`: Get all users (for testing purposes)

### Pokémon
- POST `/pokemons/api`: Create a new Pokémon
- DELETE `/pokemons/api`: Delete a Pokémon
- PUT `/pokemons/api/pokemon/:id`: Update a Pokémon
- PUT `/pokemons/api/:id`: Update a Pokémon's name
- GET `/pokemons/api/`: Get all Pokémon (or player's Pokémon if logged in)
- GET `/pokemons/api/:id`: Get a specific Pokémon

### Player-Pokémon
- POST `/api/player-pokemon`: Assign a Pokémon to a player
- GET `/api/player-pokemon/:playerId`: Get all Pokémon for a player
- PUT `/api/player-pokemon/:id`: Update a player's Pokémon
- DELETE `/api/player-pokemon/:id`: Remove a Pokémon from a player

## Models

- `Player`: Represents a player with name, email, password, and address
- `Pokemon`: Represents a Pokémon with id, name, type, picture, and abilities
- `PlayerPokemon`: Represents the relationship between a player and their Pokémon

## Controllers

- `playerController`: Handles player-related operations (register, login, logout)
- `pokemonController`: Handles Pokémon-related operations (CRUD operations)
- `playerPokemonController`: Handles operations related to assigning and managing Pokémon for players

## Middleware

- `auth.js`: Middleware for authenticating requests using JWT
- `verifyToken.js`: Middleware for verifying JWT tokens

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
PLAYER_NAME=your_mongodb_username
DATABASE_URL=your_mongodb_cluster_url
API_KEY=your_mongodb_password
TOKEN_ACCESS_SECRET=your_jwt_secret
```

## Running the Server

To start the server, run:

```
node index.js
```

The server will start on the port specified in your `.env` file.

Note: Make sure you have MongoDB set up and running before starting the server.

The `data.json` file in the root directory contains example data that you can use for testing the application.
