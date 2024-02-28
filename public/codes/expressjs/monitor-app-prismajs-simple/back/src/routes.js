import express from 'express';
import Host from './models/Hosts.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', async (req, res) => {
  const host = req.body;

  try {
    const createdHost = await Host.create(host);

    res.json(createdHost);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.get('/hosts', async (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredHosts = await Host.read({ name });

    return res.json(filteredHosts);
  }

  const hosts = await Host.read();

  return res.json(hosts);
});

router.get('/hosts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const host = await Host.readById(id);

    return res.json(host);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.put('/hosts/:id', async (req, res) => {
  const host = req.body;

  const id = req.params.id;

  try {
    const updatedHost = await Host.update({ ...host, id });

    return res.json(updatedHost);
  } catch (error) {
    throw new HTTPError(error.message, 400);
  }
});

router.delete('/hosts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Host.remove(id);

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
