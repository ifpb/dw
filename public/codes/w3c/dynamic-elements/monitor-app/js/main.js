import { hosts } from './data.js';
import { HostTable } from './components/HostTable.js';

const hostsCard = document.querySelector('.table-hosts .card-body');

hostsCard.innerHTML = HostTable(hosts);
