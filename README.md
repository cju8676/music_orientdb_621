# music_orientdb_621 

# Requirements:

OrientDB 3.2.2 instance up and running at localhost:2424 (default)
with a database named "music" and a user named "root" with password "root"
This "music" db is assumed to have vertexes `Users` and `Songs` and edges `Likes` and `Friends`.

# Usage:

## API

To run NodeJS instance that contains OrientJS driver to connect to OrientDB as well as
ExpressJS to serve the API, run the following:

```bash
cd api
npm i
npm start
```

API will start up and get exposed at localhost:3001

## Frontend

To run ReactJS frontend to display user interface:

```bash
cd ui
npm i
npm start
```

This will expose the UI at localhost:3000. API calls will be proxied to the API that is
assumed to be running at localhost:3001.