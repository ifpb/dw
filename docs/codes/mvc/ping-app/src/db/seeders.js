import Host from "../models/hosts.js";

function up() {
  Host.create({
    name: "DNS Google",
    address: "8.8.8.8",
    mask: "255.255.255.0",
    id: 1
  });

  Host.create({
    name: "IFPB",
    address: "www.ifpb.edu.br",
    mask: "255.255.255.0",
    id: 2
  });

  Host.create({
    name: "Google",
    address: "500.0.0.0",
    mask: "255.255.255.0",
    id: 3
  });
}

export default { up };
