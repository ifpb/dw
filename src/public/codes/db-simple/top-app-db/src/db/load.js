const Migration = require("../migrations");

(async () => {
  console.log("Loading...");
  await Migration.up();
})();
