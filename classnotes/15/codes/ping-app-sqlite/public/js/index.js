function createHostRow(hostContainer, host) {
  const hostView = `<tr id="host-${host.id}">
    <td class="host-name">${host.name}</td>
    <td class="host-address">${host.address}</td>
    <td class="host-transmitted">${host.transmitted}</td>
    <td class="host-received">${host.received}</td>
  </tr>`;

  hostContainer.insertAdjacentHTML("beforeend", hostView);
}

async function loadHosts() {
  const res = await fetch("/hosts/logs");

  const hosts = await res.json();

  const hostContainer = document.querySelector(".table-hosts tbody");

  hostContainer.innerHTML = "";

  for (const host of hosts) {
    createHostRow(hostContainer, host);
  }
}

function loadFormValues(title, hostName, hostCount) {
  const formLabel = document.querySelector("#hostFormLabel");
  const hostNameInput = document.querySelector("#host-name");
  const hostCountInput = document.querySelector("#host-count");

  formLabel.innerHTML = title;
  hostNameInput.value = hostName;
  hostCountInput.value = hostCount;
}

function loadFormCreateHost() {
  const hostForm = document.querySelector("#hostForm");

  loadFormValues("Ping", "", "");

  hostForm.onsubmit = async (e) => {
    e.preventDefault();

    const { name, count } = Object.fromEntries(new FormData(hostForm));

    await fetch(`/ping/${name}/${count}`);

    $("#hostFormModal").modal("toggle");

    document.querySelector("#createHostBtn").blur();

    loadHosts();
  };
}

window.loadFormCreateHost = loadFormCreateHost;

loadHosts();
