import express from "express";
import debugApp from "debug";
const debug = debugApp("app:adminRouter");
import mongodb from "mongodb";
const adminRouter = express.Router();
import sessions from "../data/sessions.json" assert { type: "json" };
import { AppConfig } from "../appconfig";

adminRouter.route("/").get((req, res) => {
  const url =
    AppConfig.CONNECTION_STRING;
  const dbName = "db-globomatics";

  (async function mongo() {
    let client;
    try {
      client = await new mongodb.MongoClient(url);
      debug("Connected to mongo DB");

      const db = client.db(dbName);
      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

export default adminRouter;
