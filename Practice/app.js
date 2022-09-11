import express from "express";
import chalk from "chalk";
import debug from 'debug';

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from my  app");
});

app.listen(3000, () => {
  console.log(`Listening on port ${chalk.green("3000")}`);
});
