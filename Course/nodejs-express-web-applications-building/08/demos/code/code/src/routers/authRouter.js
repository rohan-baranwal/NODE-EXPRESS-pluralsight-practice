const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const { username, password } = req.body;
  const url =
    'mongodb+srv://dbUser:1R7jzwoc2WuKOK4U@globomantics.o6s8j.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
      req.login(results.ops[0], () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route('/signIn')
  .get((req, res) => {
    res.render('signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );
authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
