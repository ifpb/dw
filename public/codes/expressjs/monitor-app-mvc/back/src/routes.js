import express from 'express';
import Host from './models/Hosts.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', (req, res) => {
  const host = req.body;

  try {
    const createdHost = Host.create(host);

    res.json(createdHost);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.get('/hosts', (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredHosts = Host.read('name', name);

    return res.json(filteredHosts);
  }

  const hosts = Host.read();

  return res.json(hosts);
});

router.get('/hosts/:id', (req, res) => {
  const id = req.params.id;

  try {
    const host = Host.readById(id);

    return res.json(host);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.put('/hosts/:id', (req, res) => {
  const host = req.body;

  const id = req.params.id;

  try {
    const updatedHost = Host.update({ ...host, id });

    return res.json(updatedHost);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.delete('/hosts/:id', (req, res) => {
  const id = req.params.id;

  try {
    Host.remove(id);

    return res.send(204);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  }

  // console.error(err.stack);
  // next(err)
  return res.status(500).json({ message: 'Something broke!' });
});

export default router;
