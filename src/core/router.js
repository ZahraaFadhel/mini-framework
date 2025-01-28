class Router {
  constructor() {
    this.routes = {};
  }

  addRoute(path, action) {
    this.routes[path] = action; // Register the route and its handler
  }

  navigate(path) {
    window.location.hash = path; // Change the URL hash
    this._loadRoute(path); // Load the corresponding route
  }

  _loadRoute(path) {
    const route = this.routes[path];
    if (route) {
      route(); // Execute the associated action for the route
    } else {
      console.error(`Route not found: ${path}`);
    }
  }

  _loadInitialRoute() {
    // Use window.location.hash to determine the initial path, default to '/'
    const path = window.location.hash.slice(1) || '/';
    this._loadRoute(path);

    // Listen for changes in the hash (back/forward navigation)
    window.addEventListener('hashchange', () => {
      this._loadRoute(window.location.hash.slice(1)); // Handle hash change
    });
  }
}

export default Router;
