// src/core/router.js

class Router {
  constructor() {
    this.routes = {};
    this._loadInitialRoute();
  }

  addRoute(path, action) {
    this.routes[path] = action;
  }

  navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this._loadRoute(path);
  }

  _loadRoute(path) {
    const route = this.routes[path];
    if (route) {
      route();
    } else {
      console.error(`Route not found: ${path}`);
    }
  }

  _loadInitialRoute() {
    const path = window.location.pathname;
    this._loadRoute(path);

    window.onpopstate = () => {
      this._loadRoute(window.location.pathname);
    };
  }
}

export default Router;