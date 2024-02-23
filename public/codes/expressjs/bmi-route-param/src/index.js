import express from 'express';
import morgan from 'morgan';
import { bmi } from './lib/bmi.js';

const app = express();

app.use(morgan('tiny'));

app.get('/bmi/weight/:weight/height/:height', (req, res) => {
  const weight = Number(req.params.weight);
  const height = Number(req.params.height);

  const result = {
    weight,
    height,
    bmi: bmi(weight, height),
  };

  res.json(result);
});

app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`);
});
