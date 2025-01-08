
## Framework Documentation

### Table of Contents

1. [Introduction](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#introduction)
2. [Installation &amp; Setup](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#installation--setup)
3. [Core Modules](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#core-modules)
4. [API Reference](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#api-reference)
5. [Implementation Details](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#implementation-details)
6. [Examples](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#examples)
7. [Best Practices](https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#best-practices)

---

## Introduction

Welcome to  **My Mini Framework** ! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.

### Features

1. **Abstracting the DOM**
2. **Routing System**
3. **State Management**
4. **Event Handling**

---

## Installation & Setup

To get started with Mini Framework, simply import the modules you need. No complex setup or installation is required.

### Steps:

1. **Import the Framework**

```javascript
// Import specific modules
import { Router } from "./src/index.js";
import { Store } from "./src/index.js";
import * as DOM from "./src/index.js";

// Or import everything
import { DOM, Store, Events, Router } from "./src/index.js";
```

2. **Start Using the Framework**

Once imported, you can immediately start using the modules. Refer to the Core Modules section for examples.

---

## Core Modules

### 1. `delegate`

Efficiently delegates an event to a child element matching a selector.

```javascript
export function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}
```

* **Parameters** :
* `parent`: The parent element to listen on.
* `selector`: The CSS selector for matching child elements.
* `event`: The type of event to listen for (e.g., `"click"`).
* `handler`: The callback function executed when the event occurs.

---

### 2. `createElement`

Creates a DOM element with specified attributes and children.

```javascript
export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    element.setAttribute(key, props[key]);
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
```

* **Parameters** :
* `tag`: The HTML tag to create (e.g., `"div"`, `"span"`).
* `props`: An object of attributes to set on the element.
* `...children`: Child elements or text content to append.

---

### 3. `setAttribute`

Sets an attribute on a DOM element.

```javascript
export function setAttribute(element, key, value) {
  element.setAttribute(key, value);
}
```

* **Parameters** :
* `element`: The target DOM element.
* `key`: The attribute name.
* `value`: The attribute value.

---

### 4. `appendChild`

Appends a child element to a parent element.

```javascript
export function appendChild(parent, child) {
  parent.appendChild(child);
}
```

* **Parameters** :
* `parent`: The parent DOM element.
* `child`: The child element to append.

---

### 5. `addEventListener`

Adds an event listener to an element.

```javascript
export function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
}
```

* **Parameters** :
* `element`: The DOM element to attach the event to.
* `event`: The event type (e.g., `"click"`).
* `handler`: The callback function executed when the event occurs.

---

## API Reference

### 1. **State Management**

Centralized state management ensures predictable and consistent app behavior.

#### Store Class

```javascript
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this._notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  _notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export default Store;
```

* **Methods** :
* `getState()`: Returns the current state.
* `setState(newState)`: Merges new state with the current state and notifies listeners.
* `subscribe(listener)`: Registers a listener for state updates.

---

### 2. **Routing System**

Synchronizes app state with the URL.

#### Router Class

```javascript
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
```

* **Methods** :
* `addRoute(path, action)`: Maps a path to an action.
* `navigate(path)`: Navigates to a specified route.
* `onpopstate()`: Handles browser back/forward navigation.

---

## Examples

### TodoMVC Example

```javascript
const todoApp = createElement("div", {}, [
  createElement(
    "input",
    { id: "new-todo", placeholder: "What needs to be done?" },
    []
  ),
  createElement("button", { onClick: addTodo }, ["Add Todo"]),
  createElement("ul", { id: "todo-list" }, []),
]);

function addTodo() {
  const todoText = document.getElementById("new-todo").value;
  const todoItem = createElement("li", {}, [todoText]);
  render(todoItem, document.getElementById("todo-list"));
}

render(todoApp, document.body);
```

---

## Best Practices

1. Keep state updates minimal and focused.
2. Use route-specific components for better maintainability.
3. Delegate event listeners to the parent when handling many child elements.
4. Use `createElement` consistently for DOM manipulation to maintain virtual DOM integrity.
