import express from "express";
import chalk from "chalk";
import debug from "debug";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;
const debugApp = debug("app");
const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.resolve();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Node Express Practice",
    data: ["a", "b", "c"],
  });
});

app.listen(3000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});
