const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3001;
const OrientDBClient = require("orientjs").OrientDBClient;

const client = new OrientDBClient({
  host: "localhost",
  username: "root",
  password: "root",
  pool: {
    max: 10
  }
});

const boostrap = pool => {
  app.use((req, res, next) => {
    pool
      .acquire()
      .then(session => {
        res.locals.db = session;
        res.on("finish", () => {
          session.close();
        });
        next();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.get("/", function(req, res) {
    res.send("API Entry Point");
  });

  app.get("/users", function(req, res) {
    res.locals.db
      .query("select from User")
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.get("/songs", function(req, res) {
    res.locals.db
      .query("select from User")
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.get("/onesong", function(req, res) {
    res.locals.db
      .query("select from Song where artist = 'Johnny Cash' and title = 'Ring of Fire'")
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.get("/song/:rid", function(req, res) {
    res.locals.db
      .query(`select from Song where @rid = '${req.params.rid}'`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.get("/song/likes/:rid", function(req, res) {
    res.locals.db
      .query(`SELECT expand(in('Likes')) FROM ${req.params.rid}`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post("/friend/:user_in/user/:user_out", function(req, res) {
    res.locals.db
    //TODO: this might just able to be @RID each way
      .command(
        `create edge Friends from (select from User where username = '${req.params.user_in}') to (select from User where username = '${req.params.user_out}')`
      )
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post("/likeSong/:user_in/:song_out", function(req, res) {
    res.locals.db
    //TODO: might just be @RID each way
      .command(
        `create edge Likes from (select from User where username = '${req.params.user_in}') to (select from Song where @rid = '${req.params.song_out}')`
      )
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  // get songs with titles containing searchTerm
  app.get("/songs/:searchTerm", function(req, res) {
    res.locals.db
      .query(`select from Song where title like '%${req.params.searchTerm}%'`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  // login user
  app.get("/login/:username", function(req, res) {
    res.locals.db
      .query(`select from User where username = '${req.params.username}'`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  );

  // get friends of user
  app.get("/friends/:username", function(req, res) {
    res.locals.db
      .query(`select expand(out('Friends')) from User where username = '${req.params.username}'`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  );

  // get songs liked by user
  app.get("/likes/:username", function(req, res) {
    res.locals.db
      .query(`select expand(out('Likes')) from User where username = '${req.params.username}'`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  );

  // get recommended songs for user based on what friends like and what user has not liked yet
  app.get("/recommendSongs/:rid", function(req, res) {
    res.locals.db
      .query(`SELECT expand(out('Likes')) FROM (
        SELECT expand(out('Friends')) FROM ${req.params.rid}
      ) WHERE @rid NOT IN (
        SELECT expand(out('Likes').in('Likes')) FROM ${req.params.rid}
      )`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  );

  // get recommended friends based on users who like the same songs as user and who user is not already friends with
  app.get("/recommendFriends/:rid", function(req, res) {
    res.locals.db
      .query(`SELECT expand(out('Friends')) FROM (
        SELECT expand(out('Likes').in('Likes')) FROM ${req.params.rid}
      ) WHERE @rid NOT IN (
        SELECT expand(out('Friends')) FROM ${req.params.rid}
      )`)
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
  );



  // pool.acquire().then(session => {
  //   session.liveQuery(`select from User`).on("data", msg => {

  //   });
  //   session.close();
  // });

  io.on("connection", function(socket) {

  });

  http.listen(port, function() {
    console.log("listening on *:" + port);
  });
};

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
    boostrap(pool);
  })
  .catch(err => {
    console.log(err);
  });
