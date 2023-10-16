# NodeJS NILU Proxy API

Welcome to the NodeJS NILU Proxy API repository. This project is a Node.js-based proxy API that allows you to interact with the NILU (Norwegian Institute for Air Research) API.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine.
- MondoDB CE or similar
- Docker installed if you want to use Docker for running the application.

## Getting Started

Follow the steps below to get this project up and running on your local machine.

### Running Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Spxc/NodeJS_NILU_Proxy_API.git
   ```

2. Change the directory to the project folder:
   ```bash
   cd NodeJS_NILU_Proxy_API
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start REST server
   ```bash
   node app.js
   ```
The API will be running at http://localhost:3000.

### Running with Docker
If you prefer to use Docker, you can build and run the application in a Docker container.

1. Clone this repository to your local machine (if not already done).
2. Change the directory to the project folder:
   ```bash
   cd NodeJS_NILU_Proxy_API
   ```
3. Build the Docker image:
   ```bash
   docker-compose up --force-recreate --build
   ```
The API will be running inside a Docker container at `http://localhost:3000`. It also exposes the port `8080`