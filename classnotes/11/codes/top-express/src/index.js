const express = require('express');
const top = require('./lib');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const topOutput = await top.formatted();

  res.json(topOutput);
});

app.listen(port, () => {
  console.log(`Top App at http://localhost:${port}`);
});
