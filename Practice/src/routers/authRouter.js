import express from "express";
import debugApp from "debug";
const debug = debugApp("app:authRouter");
import mongodb from "mongodb";
import passport from "passport";

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url =
    "mongodb+srv://glo-user-01:glo-user-01@cluster-globomatics.paf2yjm.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "db-globomatics";

  (async function mongo() {
    let client;
    try {
      client = await new mongodb.MongoClient(url);
      debug("Connected to mongo DB");

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);

      req.login(results, () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureRedirect: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

export default authRouter;
