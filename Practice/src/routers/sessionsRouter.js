import express from "express";
import debugApp from "debug";
const debug = debugApp("app:sessionsRouter");
import mongodb from "mongodb";
import { AppConfig } from "../appconfig";
import speakerService from "../services/speakerService";

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

sessionsRouter.route("/").get((req, res) => {
  const url = AppConfig.CONNECTION_STRING;
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
    } finally {
      client.close();
    }
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const url = AppConfig.CONNECTION_STRING;
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

      const speaker = await speakerService.getSpeakerById(session.speakers[0].id);
      session.speaker = speaker.data;
      res.render("session", {
        session,
      });
    } catch (error) {
      debug(error.stack);
    } finally {
      client.close();
    }
  })();
});

export default sessionsRouter;
