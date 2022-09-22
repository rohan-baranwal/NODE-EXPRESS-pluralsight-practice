import express from "express";
import debugApp from "debug";
const debug = debugApp("app:authRouter");
import mongodb from "mongodb";

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
  const body = req.body;
  res.json(body);
})

export default authRouter;