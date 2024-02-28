import prisma from '../database/database.js';

async function create({ name, address }) {
  if (!name || !address) {
    throw new Error('Error when passing parameters');
  }

  const createdHost = await prisma.host.create({
    data: { name, address },
  });

  return createdHost;
}

async function read(where) {
  if (where?.name) {
    where.name = {
      contains: where.name,
    };
  }

  const hosts = await prisma.host.findMany({ where });

  if (hosts.length === 1 && where) {
    return hosts[0];
  }

  return hosts;
}

async function readById(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (host) {
    return host;
  } else {
    throw new Error('Host not found');
  }
}

async function update({ id, name, address }) {
  if (!name || !address || !id) {
    throw new Error('Error when passing parameters');
  }

  const updatedHost = await prisma.host.update({
    where: {
      id,
    },
    data: { name, address },
  });

  if (updatedHost) {
    return updatedHost;
  } else {
    throw new Error('Host not found');
  }
}

async function remove(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  try {
    await prisma.host.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error('Host not found');
  }
}

export default { create, read, readById, update, remove };
