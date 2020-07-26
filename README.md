# Movie List with Sagas

## Description

_Duration: Weekend Sprint_

This application offers a user access to a databadse of movies, crosreferenced with a variety of genres.  Upon clicking a movie, a user is brought to a details view where they can then navigate back to the list or chose to edit the chosen movie's title or description. From the edit view, the user can choose to save or discard their changes and will be brought back to the chosen film's details, where their changes will be reflected if saved.

## Screen Shot

![List View](/public/images/movieList.png)
![edit view](/public/images/editView.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- SQL database (postgreSQL reccommended)

## Installation

1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. View the list of movies
2. Click on the poster for the movie you would like to select
3. From the details view, click 'edit' or 'back to movie list'
4. in the edit view, type in changes to to the title or description
5. when satisfied click 'save changes' to be redirected to the updated details view
6. to exit back to details view without saving changes, click 'cancel'


## Built With

 - React.js
 - Redux
 - Redux-Sagas
 - Material - UI
 - PostgreSQL
 - Express.js
 - React-Router-Dom
 - React-Reveal


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Special thanks to Mary, dEv, and the rest of the Paxos cohort for always supporting me. Bird Up!

