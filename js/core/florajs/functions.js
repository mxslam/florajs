// Fonction pour obtenir la route actuelle depuis l'URL
function getRoute() {
  const urlParams = new URLSearchParams(window.location.search);
  const route = urlParams.get('route');
  return route ? decodeURIComponent(route) : 'accueil';
}

// Fonction pour naviguer vers une route spécifique
function navigateTo(route) {
  history.pushState(null, '', `?route=${route}`);
  loadRoute(route);
}

// Fonction pour charger la route correspondante
function loadRoute(route) {
  const routeFunction = routes[route];
  if (typeof routeFunction === 'function') {
    ClearContent('body');
    routeFunction();
  } else {
    // Si la route n'existe pas, charger la page d'accueil ou afficher une page 404
    LoadHomePage();
  }
}

// Initialisation lors du chargement de la page
function init() {
  const route = getRoute();
  loadRoute(route);
}

window.onload = init;

// Gérer les boutons de navigation du navigateur (précédent/suivant)
window.addEventListener('popstate', function (event) {
  const route = getRoute();
  loadRoute(route);
});

// Fonction pour vider le contenu d'un élément
function ClearContent(element) {
  const container = document.querySelector(element);
  if (!container) return;
  switch (element) {
    case 'body':
      container.innerHTML = `
      <div id="spinner-container">
        <div id="spinner-background"></div>
        <div id="spinner"></div>
      </div>
      <footer></footer>`;
      break;
    default:
      container.innerHTML = '';
      break;
  }
}
