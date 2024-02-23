import * as HostTableRow from '../components/HostTableRow';
import Storage from '../services/storage';

function load() {
  const hosts = Storage.read('hosts');

  hosts.forEach(HostTableRow.create);
}

function create(investment) {
  delete investment.id;

  const createdInvestment = Storage.create('hosts', investment);

  HostTableRow.create(createdInvestment);
}

function update(investment) {
  const { id } = investment;

  const updatedInvestment = Storage.update('hosts', id, investment);

  HostTableRow.update(updatedInvestment);
}

function remove(investment) {
  const { id } = investment;

  Storage.remove('hosts', id);

  HostTableRow.remove(id);
}

export default { load, create, update, remove };
