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
      .query("select from Users")
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
      .query("select from Users")
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
      .query("select from Songs where artist = 'Johnny Cash' and title = 'Ring of Fire'")
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  app.get("/onelikes", function(req, res) {
    res.locals.db
      .query("SELECT expand(in('Likes')) FROM #62:7")
      .all()
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  // app.get("/insertallsongs", function(req, res) {
  //   for(var i = 0; i < 1000; i++) {
  //     const user = users[i];
  //     res.locals.db
  //       .command("insert into Users content " + JSON.stringify(user))
  //       .all()
  //       .then(messages => {
  //         console.log(messages);
  //       })
  //       .catch(err => {
  //         res.status(500).send(err);
  //       });
  //     console.log("USER", JSON.stringify(user));
  //     }
  // });

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
      name: "music",
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
