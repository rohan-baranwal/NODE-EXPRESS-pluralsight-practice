import express from "express";
import debugApp from "debug";
const debug = debugApp("app:authRouter");
import mongodb from "mongodb";

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  // TODO create user
  req.login(req.body, () => {
    res.redirect('/auth/profile');
  })
})

authRouter.route('/profile').get((req, res) => {
  res.json(req.user)
})

export default authRouter;