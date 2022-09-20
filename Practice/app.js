import express from "express";
import chalk from "chalk";
import debugApp from "debug";
const debug = debugApp("app");
import morgan from "morgan";
import path, {dirname} from "path";

const PORT = process.env.PORT || 3000;
const app = express();
import sessionsRouter from "./src/routers/sessionsRouter.js";

// To take care of __dirname & __filename not defined
import { fileURLToPath } from "url";
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
