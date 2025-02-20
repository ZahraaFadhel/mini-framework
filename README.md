## Framework Documentation

### Table of Contents

- [Framework Documentation](#framework-documentation)
  - [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Features](#features)
- [Installation \& Setup](#installation--setup)
  - [Steps:](#steps)
- [Core Modules](#core-modules)
  - [1. `createElement`](#1-createelement)
    - [Example Usage](#example-usage)
  - [2. `setAttribute`](#2-setattribute)
  - [3. `addEventListener`](#3-addeventlistener)
- [API Reference](#api-reference)
  - [1. **State Management**](#1-state-management)
    - [Store Class](#store-class)
  - [2. **Routing System**](#2-routing-system)
    - [Router Class](#router-class)
- [Best Practices](#best-practices)

---

## Introduction

Welcome to **My Mini Framework**! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.

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

### 1. `createElement`

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

* **Parameters**:
  * `tag`: The HTML tag to create (e.g., `"div"`, `"button"`).
  * `props`: An object of attributes to set on the element.
  * `...children`: Child elements or text content to append.

#### Example Usage

Creating a simple button:

```javascript
const button = createElement("button", { id: "myButton", class: "btn" }, "Click Me");
document.body.appendChild(button);
```

Creating a checkbox:

```javascript
const checkbox = createElement("input", { type: "checkbox", id: "myCheckbox" });
document.body.appendChild(checkbox);
```

Creating a labeled checkbox:

```javascript
const label = createElement("label", { for: "myCheckbox" }, "Accept Terms");
const checkboxWithLabel = createElement("div", {}, checkbox, label);
document.body.appendChild(checkboxWithLabel);
```

---

### 2. `setAttribute`

Sets an attribute on a DOM element.

```javascript
export function setAttribute(element, key, value) {
  element.setAttribute(key, value);
}
```

* **Example Usage**:

```javascript
const button = document.getElementById("myButton");
setAttribute(button, "disabled", "true");
```

---

### 3. `addEventListener`

Adds an event listener to an element.

```javascript
export function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
}
```

* **Example Usage**:

```javascript
addEventListener(button, "click", () => {
  alert("Button Clicked!");
});
```

---

## API Reference

### 1. **State Management**

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

* **Methods**:
  * `getState()`: Returns the current state.
  * `setState(newState)`: Merges new state with the current state and notifies listeners.
  * `subscribe(listener)`: Registers a listener for state updates.

---

### 2. **Routing System**

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

* **Methods**:
  * `addRoute(path, action)`: Maps a path to an action.
  * `navigate(path)`: Navigates to a specified route.
  * `onpopstate()`: Handles browser back/forward navigation.

---

## Best Practices

1. Keep state updates minimal and focused.
2. Use route-specific components for better maintainability.
3. Delegate event listeners to the parent when handling many child elements.
4. Use `createElement` consistently for DOM manipulation to maintain virtual DOM integrity.

