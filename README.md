# Social Media Site Backend

This repository contains the backend code for a social media site API. It provides endpoints for user, thought, reaction, and friendship management.

# Table of Contents

- [Social Media Site Backend](#social-media-site-backend)
  - [Walkthrough Video](#walkthrough-video)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Seeding Data](#seeding-data)
  - [Starting the Server](#starting-the-server)
    - [Prerequisites](#prerequisites-1)
    - [Running the Seed Script](#running-the-seed-script)
  - [How to Use](#how-to-use)
    - [Using the API](#using-the-api)
      - [Users](#users)
      - [Thoughts](#thoughts)
      - [Reactions](#reactions)
      - [Friends](#friends)
  - [Contributing](#contributing)
  - [License](#license)

## Walkthrough Video
[SocialNetworkAPI Video](SocialNetworkAPI.webm)

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed and set up:

- Node.js (v14+)
- MongoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/social-media-backend.git
   cd social-media-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Rename the `.env.example` file to `.env` and provide your MongoDB connection URL.

## Seeding Data

To populate your database with initial data for testing and development purposes, you can use the provided seed script. This script will create sample users, thoughts, reactions, and friendships.

### Prerequisites

Before running the seed script, make sure you have completed the following steps:

1. Ensure that your MongoDB database is up and running.
2. Set up your environment variables in the `.env` file.

### Running the Seed Script

1. Open a terminal and navigate to the project directory.

2. Run the following command to seed the database:

   ```sh
   node utils/seed.js
   ```

## Starting the Server

1. Start the server:

   ```sh
   npm start
   ```

2. The server will run at `http://localhost:3001`.

## How to Use

### Using the API

The social media site backend provides various API endpoints for user, thought, reaction, and friendship management. Below are examples of how to use these endpoints:

#### Users

- **GET /users**: Retrieve a list of all users.
- **GET /users/:userId**: Retrieve details of a specific user by their ID.
- **POST /users**: Create a new user. Provide `username` and `email` in the request body.
- **PUT /users/:userId**: Update a user's details by their ID.
- **DELETE /users/:userId**: Delete a user by their ID.

#### Thoughts

- **GET /thoughts**: Retrieve a list of all thoughts.
- **GET /thoughts/:thoughtId**: Retrieve details of a specific thought by its ID.
- **POST /thoughts**: Create a new thought. Provide `thoughtText`, `username`, and `userId` in the request body.
- **PUT /thoughts/:thoughtId**: Update a thought's details by its ID.
- **DELETE /thoughts/:thoughtId**: Delete a thought by its ID.

#### Reactions

- **POST /thoughts/:thoughtId/reactions**: Add a reaction to a thought. Provide `reactionBody` and `username` in the request body.
- **DELETE /thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought by reaction ID.

#### Friends

- **POST /users/:userId/friends**: Add a friend to a user. Provide `friendId` in the request body.
- **DELETE /users/:userId/friends/:friendId**: Remove a friend from a user by friend ID.

## Contributing

If you'd like to contribute to further development, please let me know!

## License

This project is licensed under the [MIT License](LICENSE).