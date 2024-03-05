function isAuthenticated() {
  if (!getToken()) {
    window.location.href = '/signin.html';
  } else {
    return true;
  }
}

function getToken() {
  return localStorage.getItem('@hostMonitor:token');
}

function signin(token) {
  localStorage.setItem('@hostMonitor:token', token);

  window.location.href = '/home.html';
}

function signout() {
  localStorage.removeItem('@hostMonitor:token');

  window.location.href = '/signin.html';
}

export default { isAuthenticated, getToken, signin, signout };
