import express from "express";
import chalk from "chalk";
import debugApp from "debug";
const debug = debugApp("app");
import morgan from "morgan";
import path, {dirname} from "path";
// const express = require('express');
// const chalk = require('chalk');
// const debug = require('debug')('app');
// const morgan = require('morgan');
// const path = require('path');
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;
const app = express();
import sessionsRouter from "./src/routers/sessionsRouter.js";
// const sessionsRouter = require("./src/routers/sessionsRouter");


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionsRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
