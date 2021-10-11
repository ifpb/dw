import api from './services/api.js';

let chart;

function createHostActions(host) {
  return `
    <i
      class="fas fa-pencil-alt mr-2"
      onclick="loadFormUpdateHost(${host.id}, '${host.name}', '${host.address}', '${host.mask}')"
      data-toggle="modal"
      data-target="#hostFormModal">
      </i>
    <i
      class="far fa-trash-alt mr-2"
      onclick="deleteHost(${host.id}, '${host.name}')"
      data-toggle="modal"
      data-target="#deleteHostModal">
    </i>
    <i
      class="fas fa-stopwatch"
      onclick="loadTimeSeries(${host.id}, '${host.name}')">
    </i>
  `;
}

function createHostRow(host) {
  const hostView = `<tr id="host-${host.id}">
    <td class="host-name">${host.name}</td>
    <td class="host-address">${host.address}</td>
    <td class="host-mask">${host.mask}</td>
    <td class="host-actions">${createHostActions(host)}</td>
  </tr>`;

  const hostContainer = document.querySelector('.table-hosts tbody');

  hostContainer.insertAdjacentHTML('beforeend', hostView);
}

async function loadHosts() {
  const hosts = await api.read('/hosts');

  for (const host of hosts) {
    createHostRow(host);
  }
}

function loadFormValues(title, hostName, hostAddress, hostMask) {
  const formLabel = document.querySelector('#hostFormLabel');
  const hostNameInput = document.querySelector('#host-name');
  const hostAddressInput = document.querySelector('#host-address');
  const hostMaskInput = document.querySelector('#host-mask');

  formLabel.innerHTML = title;
  hostNameInput.value = hostName;
  hostAddressInput.value = hostAddress;
  hostMaskInput.value = hostMask;
}

function loadFormCreateHost() {
  const hostForm = document.querySelector('#hostForm');

  loadFormValues('Novo Host', '', '', '');

  hostForm.onsubmit = async (e) => {
    e.preventDefault();

    const host = Object.fromEntries(new FormData(hostForm));

    const newHost = await api.create('/hosts', host);

    createHostRow(newHost);

    $('#hostFormModal').modal('toggle');

    document.querySelector('#createHostBtn').blur();
  };
}

function updateHostRow(host) {
  const hostName = document.querySelector(`#host-${host.id} .host-name`);
  const hostAddress = document.querySelector(`#host-${host.id} .host-address`);
  const hostMask = document.querySelector(`#host-${host.id} .host-mask`);
  const hostActions = document.querySelector(`#host-${host.id} .host-actions`);

  hostName.innerHTML = host.name;
  hostAddress.innerHTML = host.address;
  hostMask.innerHTML = host.mask;
  hostActions.innerHTML = createHostActions(host);
}

function loadFormUpdateHost(...host) {
  const [id, name, address, mask] = host;

  loadFormValues('Atualizar Host', name, address, mask);

  const hostForm = document.querySelector('#hostForm');

  hostForm.onsubmit = (e) => {
    e.preventDefault();

    const host = Object.fromEntries(new FormData(hostForm));

    api.update(`/hosts/${id}`, host);

    updateHostRow({ id, ...host });

    $('#hostFormModal').modal('toggle');
  };
}

function deleteHost(hostId, hostName) {
  document.querySelector('#modal-name-host').innerHTML = hostName;

  document.querySelector('#deleteHostBtn').onclick = (e) => {
    e.preventDefault();

    api.destroy(`/hosts/${hostId}`);

    document.querySelector(`#host-${hostId}`).remove();

    $('#deleteHostModal').modal('toggle');
  };
}

async function loadTimeSeries(hostId, hostName) {
  const times = await api.read(`/hosts/${hostId}/times`);

  chart.data.labels = times.map((t, i) => i);
  chart.data.datasets[0].data = times.map((t) => t.time);
  chart.data.datasets[0].label = `Tempo de ${hostName} (ms)`;

  chart.update();
}

function loadChart() {
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Tempo (ms)',
        data: [],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  chart = new Chart(document.querySelector('#hostTimes'), {
    type: 'bar',
    data,
    options,
  });
}

window.loadFormCreateHost = loadFormCreateHost;
window.loadFormUpdateHost = loadFormUpdateHost;
window.deleteHost = deleteHost;
window.loadTimeSeries = loadTimeSeries;

loadHosts();
loadChart();
