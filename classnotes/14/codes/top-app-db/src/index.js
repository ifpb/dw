const fs = require("fs");
const express = require("express");
const routes = require("./routes");
const Migration = require("./migrations");
const { dbFile } = require("./db");

const app = express();
const port = 3000;

app.use(routes);

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();
  }
})();

app.listen(port, () => {
  console.log(`Top App at http://localhost:${port}`);
});
