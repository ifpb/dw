import 'bootstrap';
import { hosts } from './data.js';
import { HostTable } from './components/HostTable.js';

import 'bootstrap/dist/css/bootstrap.css';

const hostsCard = document.querySelector('.table-hosts .card-body');

hostsCard.innerHTML = HostTable(hosts);
