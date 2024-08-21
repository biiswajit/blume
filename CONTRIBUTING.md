# Contributing to Kgec

This guide will help you setup the project locally
and start contributing to the repository.

## Developing

The development branch is `main`. This is the branch that all pull
requests should be made against. The changes on the `main`
branch are tagged into a release periodically.

### Prerequisites

- [Node.js](https://nodejs.org/en) version 20.15.0
- [npm package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 10.7.0
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Postgres](https://hub.docker.com/_/postgres)

### Setup

1. Clone the repository from [Github](https://github.com/biiswajit/kgec/fork)

  ```
  git clone https://github.com/<github_username>/kgec.git
  ```

2. Navigate to the project folder

  ```
  cd kgec
  ```

3. Ensure you are on the correct version of Node.js (20.15.0). If you are using `nvm`, there is an `.nvmrc` file that will automatically select the correct version of Node.js when you navigate to the repository.

4. Install dependencies of kgec project

  ```
  npm install
  ```

5. Create an .env file

  ```
  cp .env.example .env
  ```

5. Run postgres database using docker container

  ```
  npm run db:start
  ```

6. Run the project

  ```
  npm run dev
  ```

  You can see your project is running on `http://localhost:3000/` url.

7. Stop postgres database running on port 5432 whenever your work is done

  ```
  npm run db:stop
  ```