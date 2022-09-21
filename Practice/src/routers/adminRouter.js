import express from "express";
import debugApp from "debug";
const debug = debugApp("app:adminRouter");
import mongodb from "mongodb";
const adminRouter = express.Router();
import sessions from "../data/sessions.json" assert { type: "json" };

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://glo-user-01:glo-user-01@cluster-globomatics.paf2yjm.mongodb.net/?retryWrites=true&w=majority";
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
