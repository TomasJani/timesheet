# Time Sheet Application

App is power by **docker**.

Start by `docker-compose build` and then `docker-compose up`.

Website will be avaible at http://localhost:3000/

API will be avaible at http://localhost:5000/


Authentication and user managrment is powered by Auth0.

### Used technologies

#### Front-end
- React
- React Context
- Bootstrap

#### Back-end
- Express
- TypeORM
- Typescript

#### DB
- PostgreSQL

### Client endpoints
- http://localhost:3000/
    - Home page
- http://localhost:3000/app _Authorized users only_
    - Time Sheet Application

### API endpoints
- Get - http://localhost:5000/entries
    - Returns array of all entries.
- Post - http://localhost:5000/entries
    - Adds entry.
    - Also creates day, if day of entry is not yet in database.
    - If entry exist or intersects other entry, sends back 500 response status.
    - Example `{
    "type": 0,
    "start": "10:00",
    "end": "15:00",
    "date": "1998-10-09",
    "user": "auth0|5f57edad525812007039f108"
}`
- Get - http://localhost:5000/days
    - Returns array of all days.
- Get - http://localhost:5000/days/:n 
    - Return array of **n** **user**'s days counting from **date** including.
    - Demands **date** and **user** token query parameters, **n** is number of queried days
    - Example http://localhost:5000/days/1?date=2020-09-14&user=auth0|5f57edad525812007039f108

> If any endpoint misses field in body, params or query, API return 405 response status.
