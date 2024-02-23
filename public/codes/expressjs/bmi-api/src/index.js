import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import { bmi } from './lib/bmi.js';

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

app.post('/bmi', (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height) {
    throw new HTTPError('Error when passing parameters', 400);
  }

  const result = {
    weight,
    height,
    bmi: bmi(weight, height),
  };

  res.json(result);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
app.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  }

  // console.error(err.stack);
  // next(err)
  return res.status(500).json({ message: 'Something broke!' });
});

app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
