const hosts = [];

function create(hostValues) {
  const id = hosts.length + 1;

  const host = { id, ...hostValues };

  hosts.push(host);

  return host;
}

function readAll() {
  return hosts;
}

function read(id) {
  return hosts.find((host) => host.id === id);
}

export default { create, readAll, read };
