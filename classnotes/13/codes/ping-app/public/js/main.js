import api from "./service/api.js";

let chart;

function loadCreateHostForm() {
  const form = document.querySelector("form");

  const modalForm = new bootstrap.Modal(
    document.querySelector("#exampleModal")
  );

  form.onsubmit = async (event) => {
    event.preventDefault();

    let host = Object.fromEntries(new FormData(form));

    host = await api.create("hosts", host);

    createHostRow(host);

    modalForm.hide();

    form.reset();
  };
}

async function loadHosts() {
  const hosts = await api.read("hosts");

  showHosts(hosts);
}

function showHosts(hosts) {
  for (const host of hosts) {
    createHostRow(host);
  }
}

function createHostRow(host) {
  const row = `<tr id="host-${host.id}" class="host">
      <td>${host.name}</td>
      <td>${host.address}</td>
      <td class="align-middle">
        <div class="d-flex justify-content-between">
          <i 
            class="fas fa-stopwatch"
            onclick="loadTimeSeries(${host.id}, '${host.name}')"
          >
          </i>
          <div class="spinner-border spinner-border-sm invisible" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </td>
    </tr>`;

  const tbody = document.querySelector("tbody");

  tbody.insertAdjacentHTML("beforeend", row);
}

function loadChart() {
  const ctx = document.getElementById("myChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function loadTimeSeries(hostId, hostName) {
  const loading = document.querySelector(`#host-${hostId} .spinner-border`);

  loading.classList.remove("invisible");

  activeHostRow(hostId);

  let times;

  try {
    times = await api.read(`hosts/${hostId}/times`);

    const data = {
      labels: Object.keys(times.map((t, i) => i)),
      datasets: [
        {
          label: "Tempo (ms)",
          data: times.map((t) => t.time)
        }
      ]
    };

    chart.data = data;

    chart.update();
  } catch (error) {
    const toastElement = document.querySelector("#liveToast");

    const toastBody = document.querySelector(".toast-body");

    toastBody.innerText = error.message;

    const toast = new bootstrap.Toast(toastElement);

    toast.show();

    const activedRow = document.querySelector(`#host-${hostId}`);

    activedRow.classList.remove("table-active");
  } finally {
    loading.classList.add("invisible");
  }
}

function activeHostRow(hostId) {
  const rows = document.querySelectorAll("tr.host");

  for (const row of rows) {
    if (row.id === `host-${hostId}`) {
      row.classList.add("table-active");
    } else {
      row.classList.remove("table-active");
    }
  }
}

loadHosts();

loadChart();

loadCreateHostForm();

window.loadTimeSeries = loadTimeSeries;
