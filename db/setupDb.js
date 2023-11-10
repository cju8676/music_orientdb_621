// first create a database called music621
// then run this file to populate the database
const OrientDBClient = require('orientjs').OrientDBClient;
// import mock data json
const users = require('./MOCK_DATA.json');
const songs = require('./songs.json');

const client = new OrientDBClient({
    host: "localhost",
    username: "root",
    password: "root",
    pool: {
      max: 10
    }
  });

function createNodesAndEdges(session) {
    session.class.create('User', 'V')
        .then(
            function(user){
                console.log('Created class: ' + user.name);
        });
    session.class.create('Song', 'V')
        .then(
            function(song){
                console.log('Created class: ' + song.name);
        });
    session.class.create('Likes', 'E')
        .then(
            function(likes){
                console.log('Created class: ' + likes.name);
        });
}

function populateUserNodes(session) {
    for (i = 0; i < users.length ; i++) {
        // console.log(users[i])
        session.command("INSERT INTO User CONTENT " + JSON.stringify(users[i]))
    }
    console.log("Inserted Users!")
}

function populateSongNodes(session) {
    for (i = 0; i < songs.songs.length ; i++) {
        console.log("Song: ", songs.songs[i])
        session.command("INSERT INTO Song CONTENT " + JSON.stringify(songs.songs[i]))
    }
    console.log("Inserted Songs!")
}

client
  .connect()
  .then(() => {
    return client.sessions({
      name: "music621",
      username: "root",
      password: "root",
      pool: {
        max: 25
      }
    });
  })
  .then(pool => {
    pool
      .acquire()
      .then(session => {
        createNodesAndEdges(session);
        populateUserNodes(session);
        populateSongNodes(session);
      })
      .catch(err => {
        console.log(err)
      });
  })
  .catch(err => {
    console.log(err);
  });