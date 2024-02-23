export function HostRow(host) {
  return `
  <tr>
    <td>${host.name}</td>
    <td>${host.address}</td>
    <td>${host.mask}</td>
  </tr>
  `;
}

export function HostTable(hosts) {
  return `
  <table class="table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Endereço</th>
        <th>Máscara</th>
      </tr>
    </thead>
    <tbody>
      ${hosts.map((host) => HostRow(host)).join('')}
    </tbody>
  </table>
  `;
}
