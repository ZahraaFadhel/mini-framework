## Framework Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core Modules](#core-modules) 
4. [API Reference](#api-reference)
5. [Implementation Details](#implementation-details)
6. [Examples](#examples)
7. [Best Practices](#best-practices)

## Introduction
Welcome to **My Mini Framework**! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.

### Features
1. **Abstracting the DOM**
2. **Routing System**
3. **State Management**
4. **Event Handling**

### Setting Up
To get started with Mini Framework, simply import the modules you need. No complex setup or installation is required.

- Step 1: Import the Framework
You can import the entire framework or individual modules:

```js
// Import specific modules
import { Router } from "./src/index.js";
import { Store } from "./src/index.js";
import * as DOM from "./src/index.js";

// Or import everything
import { DOM, Store, Events, Router } from "./src/index.js";
```
- Step 2: Start Using the Framework
Once imported, you can immediately start using the modules. Refer to the Core Modules section for examples.

### API Documentation

#### 1. **Creating Elements**

Use the `createElement` method to create DOM elements:

```javascript
import { DOM } from './src/index.js';
const { createElement, render } = DOM;

const element = createElement(
  "div",
  {
    class: "container",
    id: "main-container",
  },
  [
    createElement("h1", {}, ["Welcome to My Framework"]),
    createElement("button", { onClick: () => alert("Hello!") }, [
      "Click Me",
    ]),
  ]
);
render(element, document.body);
```

#### 2. **Handling Events**
Custom event handling simplifies adding and managing events:

```javascript
import { Events } from './src/index.js';
Events.on("buttonClick", () => console.log("Button clicked!"));
const button = createElement(
  "button",
  {
    onClick: () => app.trigger("buttonClick"),
  },
  ["Click Me"]
);
render(button, document.body);
```

#### 3. **State Management**

Centralized state management keeps your app predictable:

```javascript
import { Store } from './src/index.js';
Store.state = {
  count: 0,
};

Store.subscribe("count", (newValue) => {
  console.log("Count updated:", newValue);
});

Store.updateState("count", app.state.count + 1);
```

#### 4. **Routing**

Define routes and their corresponding views:

```javascript
import { Router } from './src/index.js';

const router = new Router();

router.addRoute("/", () => createElement("h1", {}, ["Home Page"]));
router.addRoute("/about", () => createElement("h1", {}, ["About Page"]));
router.navigate();
```

### TodoMVC Example

Here is how to create a TodoMVC using the framework:
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

### Why Things Work This Way

1. **Abstracting the DOM**: Provides a cleaner interface to interact with DOM elements.
2. **Virtual DOM**: Efficiently updates only the parts of the UI that have changed.
3. **State Management**: Ensures that data is consistent and easily accessible across the app.
4. **Routing System**: Synchronizes the application state with the URL for a better user experience.
