import express from 'express';
import morgan from 'morgan';
import { bmi } from './lib/bmi.js';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

app.post('/bmi', (req, res) => {
  const { weight, height } = req.body;

  const result = {
    weight,
    height,
    bmi: bmi(weight, height),
  };

  res.json(result);
});

app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
