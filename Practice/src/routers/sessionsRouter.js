import express from "express";
import sessions from "../data/sessions.json" assert { type: "json" };

const sessionsRouter = express.Router();

sessionsRouter.route("/").get((req, res) => {
  res.render("sessions", {
    sessions,
  });
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.render("session", {
    session: sessions[id],
  });
});

export default sessionsRouter;
