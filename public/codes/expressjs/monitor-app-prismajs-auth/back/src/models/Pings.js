import prisma from '../database/database.js';

async function create({ icmps, stats, hostId, userId }) {
  if (!icmps || !stats || !hostId || !userId) {
    throw new Error('Error when passing parameters');
  }

  const createdPing = await prisma.ping.create({
    data: {
      icmps: {
        create: icmps,
      },
      stats: {
        create: stats,
      },
      host: {
        connect: {
          id: hostId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      icmps: true,
      stats: true,
      host: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return createdPing;
}

async function read(where = {}) {
  const pings = await prisma.ping.findMany({
    where,
    include: {
      icmps: true,
      stats: true,
      host: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return pings;
}

export default { create, read };
