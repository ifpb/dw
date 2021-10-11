import "express-async-errors";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import exphbs from "express-handlebars";

import { router } from "./routes/index.js";
import Seed from "./db/seeders.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan("tiny"));

app.use(express.static(path.resolve("public")));

app.engine(".hbs", exphbs({ extname: ".hbs" }));

app.set("views", path.resolve("src", "views"));

app.set("view engine", ".hbs");

app.use(router);

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

Seed.up();

app.listen(3000, () => console.log("Server running"));
