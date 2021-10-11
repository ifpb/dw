# Pacotes no JavaScript

## CRUD Host

| Back                                                                                                                                                                  | Front                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Edit host-app-back](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/host-app-back-moeem?fontsize=14&hidenavigation=1&theme=dark) | [![Edit host-app-times](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/host-app-times-zvel9?fontsize=14&hidenavigation=1&theme=dark) |

### Read Host

![](/imgs/packages/read-hosts.png)

hosts-times/front/index.html:

```html
<div class="card">
  ...
  <div class="card-body">
    <table class="table table-hosts">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Máscara</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
```

hosts-times/front/js/index.js:

```js
import api from './services/api.js';

function createHostActions(host) {
  return `
    <i
      class="fas fa-pencil-alt mr-2"
      data-toggle="modal"
      data-target="#hostFormModal"
      onclick="loadFormUpdateHost(${host.id}, '${host.name}', '${host.address}', '${host.mask}')">
    </i>
    <i
      class="far fa-trash-alt mr-2"
      data-toggle="modal"
      data-target="#deleteHostModal"
      onclick="deleteHost(${host.id}, '${host.name}')">
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

loadHosts();
```

### Create Host

![](/imgs/packages/create-host.gif)

hosts-times/front/index.html:

```html
<div class="card">
  <div class="card-header font-weight-bold text-center">
    Hosts
    <div class="float-right m-0">
      <i
        class="fas fa-plus"
        id="createHostBtn"
        data-toggle="modal"
        data-target="#hostFormModal"
        onclick="loadFormCreateHost()">
      </i>
    </div>
  </div>
  ...
</div>
```

```html
<form id="hostForm">
  <div
    class="modal fade"
    id="hostFormModal"
    tabindex="-1"
    aria-labelledby="hostFormLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="hostFormLabel"></h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="host-name">Nome</label>
            <input
              type="text"
              class="form-control"
              id="host-name"
              name="name"
            />
          </div>
          <div class="form-group">
            <label for="host-address">Endereço</label>
            <input
              type="text"
              class="form-control"
              id="host-address"
              name="address"
            />
          </div>
          <div class="form-group">
            <label for="host-mask">Máscara</label>
            <input
              type="text"
              class="form-control"
              id="host-mask"
              name="mask"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Fechar
          </button>
          <button type="submit" class="btn btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</form>
```

![](/imgs/packages/create-host.png)

hosts-times/front/js/index.js:

```js
import api from './services/api.js';

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
```

### Update Host

![](/imgs/packages/update-host.gif)

hosts-times/front/js/index.js:

```js
function createHostRow(host) {
  const hostView = `<tr id="host-${host.id}">
    ...
    <td class="host-actions">${createHostActions(host)}</td>
  </tr>`;
  ...
}

function createHostActions(host) {
  return `
    <i
      class="fas fa-pencil-alt mr-2"
      onclick="loadFormUpdateHost(${host.id}, '${host.name}', '${host.address}', '${host.mask}')"
      data-toggle="modal"
      data-target="#hostFormModal">
    </i>
    ...
  `;
}
```

hosts-times/front/index.html:

![](/imgs/packages/update-host.png)

hosts-times/front/js/index.js:

```js
import api from './services/api.js';

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

window.loadFormUpdateHost = loadFormUpdateHost;
```

### Delete Host

![](/imgs/packages/delete-host.gif)

hosts-times/front/js/index.js:

```js
function createHostRow(host) {
  const hostView = `<tr id="host-${host.id}">
    ...
    <td class="host-actions">${createHostActions(host)}</td>
  </tr>`;
  ...
}

function createHostActions(host) {
  return `
    ...
    <i
      class="far fa-trash-alt mr-2"
      onclick="deleteHost(${host.id}, '${host.name}')"
      data-toggle="modal"
      data-target="#deleteHostModal">
    </i>
    ...
  `;
}
```

hosts-times/front/index.html:

```html
<form id="formDeleteHost">
  <div
    class="modal fade"
    id="deleteHostModal"
    tabindex="-1"
    aria-labelledby="deleteHostLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteHostLabel">Excluir comida</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Deseja realmente excluir <span id="modal-name-host"></span>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Fechar
          </button>
          <button type="submit" class="btn btn-primary" id="deleteHostBtn">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</form>
```

![](/imgs/packages/delete-host.png)

hosts-times/front/js/index.js:

```js
import api from './services/api.js';

function deleteHost(hostId, hostName) {
  document.querySelector('#modal-name-host').innerHTML = hostName;

  document.querySelector('#deleteHostBtn').onclick = (e) => {
    e.preventDefault();

    api.destroy(`/hosts/${hostId}`);

    document.querySelector(`#host-${hostId}`).remove();

    $('#deleteHostModal').modal('toggle');
  };
}

window.deleteHost = deleteHost;
```

## Chart.js

---

- [Chart.js](https://www.chartjs.org/docs/latest/)
  - [Instalação](https://www.chartjs.org/docs/latest/getting-started/installation.html)
  - [Exemplo](https://www.chartjs.org/docs/latest/getting-started/usage.html)

![](/imgs/packages/times-chart.gif)

hosts-times/front/index.html:

```html
<div class="card">
  <div class="card-header font-weight-bold text-center">Tempos</div>
  <div class="card-body">
    <canvas id="hostTimes"></canvas>
  </div>
</div>
```

hosts-times/front/js/index.js:

```js
let chart;

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

window.loadTimeSeries = loadTimeSeries;

loadChart();
```

```js
function createHostRow(host) {
  const hostView = `<tr id="host-${host.id}">
    ...
    <td class="host-actions">${createHostActions(host)}</td>
  </tr>`;
  ...
}

function createHostActions(host) {
  return `
    ...
    <i
      class="fas fa-stopwatch"
      onclick="loadTimeSeries(${host.id}, '${host.name}')">
    </i>
  `;
}

async function loadTimeSeries(hostId, hostName) {
  const times = await api.read(`/hosts/${hostId}/times`);

  chart.data.labels = times.map((t, i) => i);
  chart.data.datasets[0].data = times.map((t) => t.time);
  chart.data.datasets[0].label = `Tempo de ${hostName} (ms)`;

  chart.update();
}
```
