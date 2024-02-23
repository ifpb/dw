import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.get('/hello/pt', (req, res) => {
  res.send('Olá Mundo!');
});

app.get('/hello/en', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});
