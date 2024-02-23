import 'bootstrap';
import 'iconify-icon';

import HostForm from './components/HostForm';
import Modal from './components/Modal';
import Hosts from './lib/hosts';
import Storage from './services/storage';
import { hosts } from './data/seed';

import 'bootstrap/dist/css/bootstrap.css';

import '../css/style.css';

Storage.load('hosts', hosts);

Hosts.load();

HostForm.create();

Modal.create();
