import {
  createElement,
  setAttribute,
  appendChild,
} from "../../../src/core/dom.js";

// Documentation Page Function

// Page 2 Function
export function documentationPage() {
  const root = document.getElementById('app');
  root.innerHTML = '';

  // Create content for Page 2
  const container = createElement('div', { class: 'container' });

  const header = createElement('h2', { class: 'page-header' }, 'Documentation');

  const content = createElement('div', { class: 'page-content documentation-content' });

  content.innerHTML = `
      <h3>Table of Contents</h3>
      <div class="toc-buttons">
        <a href="#introduction" class="toc-button">Introduction</a>
        <a href="#installation" class="toc-button">Installation & Setup</a>
        <a href="#core" class="toc-button">Core Modules</a>
        <a href="#API" class="toc-button">API Reference</a>
        <a href="#Examples" class="toc-button">Examples</a>
        <a href="#best-practices" class="toc-button">Best Practices</a>
      </div>

      <hr>

      <h4 id="introduction">Introduction</h4>
      <p>Welcome to <strong>My Mini Framework</strong>! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.</p>
      
      <h5>Features</h5>
      <ul>
        <li><strong>Abstracting the DOM</strong></li>
        <li><strong>Routing System</strong></li>
        <li><strong>State Management</strong></li>
        <li><strong>Event Handling</strong></li>
      </ul>
      
      <hr>

      <h4 id="installation">Installation & Setup</h4>
      <p>To get started with Mini Framework, simply import the modules you need. No complex setup or installation is required.</p>
      <p><strong>Steps:</strong></p>
      <ol>
        <li><strong>Import the Framework</strong>
          <pre><code>import { Router } from "./src/index.js";</code></pre>
        </li>
        <li><strong>Start Using the Framework</strong>
          <p>Once imported, you can immediately start using the modules. Refer to the Core Modules section for examples.</p>
        </li>
      </ol>

      <hr>

      <h4 id="core">Core Modules</h4>
      <h5>1. <code>delegate</code></h5>
      <p>Efficiently delegates an event to a child element matching a selector.</p>
      <pre><code>
export function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}
      </code></pre>
      <ul>
        <li><strong>Parameters:</strong></li>
        <li><strong>parent:</strong> The parent element to listen on.</li>
        <li><strong>selector:</strong> The CSS selector for matching child elements.</li>
        <li><strong>event:</strong> The type of event to listen for (e.g., "click").</li>
        <li><strong>handler:</strong> The callback function executed when the event occurs.</li>
      </ul>
      <h6>Example Usage:</h6>
      <pre><code>
const parentElement = document.getElementById('parent');
delegate(parentElement, '.child', 'click', (e) => {
  console.log('Child clicked!', e.target);
});
      </code></pre>

      <h5>2. <code>createElement</code></h5>
      <p>Creates a DOM element with specified attributes and children.</p>
      <pre><code>
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
      </code></pre>
      <ul>
        <li><strong>Parameters:</strong></li>
        <li><strong>tag:</strong> The HTML tag to create (e.g., "div", "span").</li>
        <li><strong>props:</strong> An object of attributes to set on the element.</li>
        <li><strong>...children:</strong> Child elements or text content to append.</li>
      </ul>
      <h6>Example Usage:</h6>
      <pre><code>
const button = createElement('button', { class: 'btn', id: 'myButton' }, 'Click Me');
document.body.appendChild(button);
      </code></pre>

      <h5>3. <code>setAttribute</code></h5>
      <p>Sets an attribute on a DOM element.</p>
      <pre><code>
export function setAttribute(element, key, value) {
  element.setAttribute(key, value);
}
      </code></pre>
      <ul>
        <li><strong>Parameters:</strong></li>
        <li><strong>element:</strong> The target DOM element.</li>
        <li><strong>key:</strong> The attribute name.</li>
        <li><strong>value:</strong> The attribute value.</li>
      </ul>
      <h6>Example Usage:</h6>
      <pre><code>
const button = document.getElementById('myButton');
setAttribute(button, 'disabled', 'true');
      </code></pre>

      <h5>4. <code>appendChild</code></h5>
      <p>Appends a child element to a parent element.</p>
      <pre><code>
export function appendChild(parent, child) {
  parent.appendChild(child);
}
      </code></pre>
      <ul>
        <li><strong>Parameters:</strong></li>
        <li><strong>parent:</strong> The parent DOM element.</li>
        <li><strong>child:</strong> The child element to append.</li>
      </ul>
      <h6>Example Usage:</h6>
      <pre><code>
const parentElement = document.getElementById('parent');
const childElement = createElement('span', {}, 'Hello World');
appendChild(parentElement, childElement);
      </code></pre>

      <h5>5. <code>addEventListener</code></h5>
      <p>Adds an event listener to an element.</p>
      <pre><code>
export function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
}
      </code></pre>
      <ul>
        <li><strong>Parameters:</strong></li>
        <li><strong>element:</strong> The DOM element to attach the event to.</li>
        <li><strong>event:</strong> The event type (e.g., "click").</li>
        <li><strong>handler:</strong> The callback function executed when the event occurs.</li>
      </ul>
      <h6>Example Usage:</h6>
      <pre><code>
const button = document.getElementById('myButton');
addEventListener(button, 'click', () => {
  alert('Button clicked!');
});
      </code></pre>

      <hr>

      <h4 id="API">API Reference</h4>
      <h5>1. State Management</h5>
      <h6>Store Class</h6>
      <pre><code>
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
      </code></pre>

      <h5>2. Routing System</h5>
      <h6>Router Class</h6>
      <pre><code>
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
      console.error(\`Route not found: \${path}\`);
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
      </code></pre>

      <hr>

      <h4 id="Examples" >Examples</h4>
      <h5>TodoMVC Example</h5>
      <pre><code>
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
      </code></pre>

      <hr>

      <h4 id="best-practices">Best Practices</h4>
      <ul>
        <li>Keep state updates minimal and focused.</li>
        <li>Use route-specific components for better maintainability.</li>
        <li>Delegate event listeners to the parent when handling many child elements.</li>
        <li>Use <code>createElement</code> consistently for DOM manipulation to maintain virtual DOM integrity.</li>
      </ul>
    `;

  appendChild(container, header);
  appendChild(container, content);
  appendChild(root, container);
}
