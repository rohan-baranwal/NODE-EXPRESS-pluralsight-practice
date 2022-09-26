import debugApp from "debug";
const debug = debugApp("app:localStrategy");
import passport from "passport";
import mongodb from "mongodb";
import { Strategy } from "passport-local";
import { AppConfig } from "../../appconfig";

const localStrategy = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
          AppConfig.CONNECTION_STRING;
        const dbName = "db-globomatics";

        (async function validateUser() {
          let client;
          try {
            client = await new mongodb.MongoClient(url);
            debug("Connected to mongo DB");

            const db = client.db(dbName);
            const user = await db.collection("users").findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};

export default localStrategy;
