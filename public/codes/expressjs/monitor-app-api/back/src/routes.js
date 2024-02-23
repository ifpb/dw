import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hosts } from './data/hosts.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.post('/hosts', (req, res) => {
  const host = req.body;

  const id = uuidv4();

  const newHost = { ...host, id };

  if (!host.name || !host.address) {
    throw new HTTPError('Error when passing parameters', 400);
  }

  hosts.push(newHost);

  res.json(newHost);
});

router.get('/hosts', (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredHosts = hosts.filter((host) => host.name.includes(name));

    return res.json(filteredHosts);
  }

  return res.json(hosts);
});

router.get('/hosts/:id', (req, res) => {
  const id = req.params.id;

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HTTPError('Host not found', 400);
  }

  return res.json(hosts[index]);
});

router.put('/hosts/:id', (req, res) => {
  const host = req.body;

  const id = req.params.id;

  if (!host.name || !host.address || !id) {
    throw new HTTPError('Error when passing parameters', 400);
  }

  const newHost = { ...host, id };

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HTTPError('Host not found', 400);
  }

  hosts[index] = newHost;

  return res.json(newHost);
});

router.delete('/hosts/:id', (req, res) => {
  const id = req.params.id;

  const index = hosts.findIndex((host) => host.id === id);

  if (!hosts[index]) {
    throw new HTTPError('Host not found', 400);
  }

  hosts.splice(index, 1);

  return res.send(204);
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
