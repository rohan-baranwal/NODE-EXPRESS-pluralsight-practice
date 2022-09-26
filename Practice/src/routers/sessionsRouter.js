import express from "express";
import debugApp from "debug";
const debug = debugApp("app:sessionsRouter");
import mongodb from "mongodb";

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

sessionsRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://glo-user-01:glo-user-01@cluster-globomatics.paf2yjm.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "db-globomatics";

  (async function mongo() {
    let client;
    try {
      client = new mongodb.MongoClient(url);
      debug("Connected to mongo DB");

      const db = client.db(dbName);
      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", {
        sessions,
      });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const url =
    "mongodb+srv://glo-user-01:glo-user-01@cluster-globomatics.paf2yjm.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "db-globomatics";

  (async function mongo() {
    let client;
    try {
      client = await new mongodb.MongoClient(url);
      debug("Connected to mongo DB");

      const db = client.db(dbName);
      const session = await db
        .collection("sessions")
        .findOne({ _id: new mongodb.ObjectId(req.params.id) });

      res.render("session", {
        session,
      });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

export default sessionsRouter;
