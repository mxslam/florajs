'use strict';
function Route() {
  page = getRoute();
  switch (page) {
    default:
      LoadHomePage();
      break;
  }
}
function getRoute() {
  const url = window.location.href;
  const match = url.match(/[?&]route=([^&]*)/);
  return match ? decodeURIComponent(match[1]) : 'accueil';
}
function ChangeURL(path) {
  history.pushState(null, '', `?route=${path}`);
  const spinnercontainer = document.getElementById('spinner-container');
  if (spinnercontainer) {
    spinnercontainer.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.animation = 'fadeInRadial 0.4s forwards';
    document.body.offsetHeight;
  }
}
function ClearContent(element) {
  const container = document.querySelector(element);
  console.log(container);
  if (!container) return;
  switch (element) {
    case 'body':
      container.innerHTML = `
      <div id="spinner-container">
        <div id="spinner-background"></div>
        <div id="spinner"></div>
      </div>
      <footer></footer>`;
    default:
      container.innerHTML = '';
      return;
  }
}
