import {
  createElement,
  setAttribute,
  appendChild,
  addEventListener,
} from "../../src/core/dom.js";
import EventEmitter from "../../src/core/events.js"; // Correct import for EventEmitter
import Router from "../../src/core/router.js";
import Store from "../../src/core/store.js";
import { localStorageMiddleware } from "./store/middleware.js";
import { delegate } from "../../src/core/delegate.js";
import { h, render } from "../../src/core/virtualDom.js";

// Initialize Router
const router = new Router();

// Initialize EventEmitter
const eventEmitter = new EventEmitter(); // Correct instantiation of EventEmitter

// Login Page Function
function loginPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create container for About Us page
  const container = createElement("div");
  setAttribute(container, "class", "container");

  // Create header for About Us
  const header = createElement("h1");
  setAttribute(header, "class", "page-header");
  header.textContent = "Login";

  const content = createElement("div");
  setAttribute(content, "class", "page-content");

  // Create login input
  const usernameInput = createElement("input");
  setAttribute(usernameInput, "type", "text");
  setAttribute(usernameInput, "id", "username");
  setAttribute(usernameInput, "placeholder", "Enter your username");
  setAttribute(usernameInput, "class", "login-input");

  // Create login button
  const loginButton = createElement("button");
  setAttribute(loginButton, "class", "login-button");
  loginButton.textContent = "Login";

  // Add event to button using native addEventListener
  loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem("username", username); // Save username (optional)
      router.navigate("/home"); // Navigate to home page
    } else {
      alert("Please enter your username");
    }
  });

  // Append elements to the container
  appendChild(container, header);
  appendChild(content, usernameInput);
  appendChild(content, loginButton);
  appendChild(container, content);

  // Append container to the root
  appendChild(root, container);
}

// Home Page Function
function homePage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  const username = localStorage.getItem("username") || "Guest";

  // Create home container
  const container = createElement("div");
  setAttribute(container, "class", "container");

  // Create header for Home
  const header = createElement("h1");
  setAttribute(header, "class", "page-header");
  header.textContent = `Welcome, ${username}!`;

  const content = createElement("div");
  setAttribute(content, "class", "page-content");

  // Create sub-message
  const subMessage = createElement("p");
  setAttribute(subMessage, "class", "sub-message");
  subMessage.textContent =
    "We’re happy you’re here! Take a look around and see the many features awaiting you.";

  // Create buttons container
  const buttonsContainer = createElement("div");
  setAttribute(buttonsContainer, "class", "buttons-container");

  // Create buttons
  const button1 = createElement("button");
  setAttribute(button1, "class", "nav-button");
  button1.textContent = "About Us";

  const button2 = createElement("button");
  setAttribute(button2, "class", "nav-button");
  button2.textContent = "Documentation";

  const button3 = createElement("button");
  setAttribute(button3, "class", "nav-button");
  button3.textContent = "ToDo-List";

  // Add navigation events directly using addEventListener
  button1.addEventListener("click", () => router.navigate("/about"));
  button2.addEventListener("click", () => router.navigate("/documentation"));
  button3.addEventListener("click", () => router.navigate("/toDoListPage"));

  // Append buttons to buttons container
  appendChild(buttonsContainer, button1);
  appendChild(buttonsContainer, button2);
  appendChild(buttonsContainer, button3);

  // Append elements to the container
  appendChild(container, header);
  appendChild(content, subMessage);
  appendChild(content, buttonsContainer);
  appendChild(container, content);

  // Append container to the root
  appendChild(root, container);
}

// About Us Page Function
function aboutUsPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create container for About Us page
  const container = createElement("div");
  setAttribute(container, "class", "container");

  // Create header for About Us
  const header = createElement("h1");
  setAttribute(header, "class", "page-header");
  header.textContent = "About Us";

  const content = createElement("div");
  setAttribute(content, "class", "page-content");

  // Create paragraph for the framework description
  const description = createElement("p");
  setAttribute(description, "class", "page-description");
  description.textContent = `Our framework is designed to make web development easier by providing a simple, easy-to-understand approach for handling the DOM, events, routing, and state management. It gives developers full control over the structure and behavior of their web applications.`;

  // Create paragraph for team introduction
  const teamIntro = createElement("p");
  setAttribute(teamIntro, "class", "team-introduction");
  teamIntro.textContent =
    "Our team consists of passionate developers who love building tools that make developers’ lives easier. We hope our framework helps you build powerful web apps efficiently.";

  // Create a footer for contact information
  const footer = createElement("footer");
  setAttribute(footer, "class", "footer");
  const contactInfo = createElement("p");
  contactInfo.textContent = "Contact us at: contact@ourframework.com";

  // Append all elements to the container
  appendChild(container, header);
  appendChild(content, description);
  appendChild(content, teamIntro);
  appendChild(content, footer);
  appendChild(container, content);

  // Append the container to the root element
  appendChild(root, container);
}

// Page 2 Function
function documentationPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create content for Page 2
  const container = createElement("div");
  setAttribute(container, "class", "container");

  const header = createElement("h2");
  setAttribute(header, "class", "page-header");
  header.textContent = "Documentation";

  const content = createElement("div");
  setAttribute(content, "class", "page-content documentation-content");
  content.innerHTML = `
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#introduction">Introduction</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#installation--setup">Installation & Setup</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#core-modules">Core Modules</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#api-reference">API Reference</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#implementation-details">Implementation Details</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#examples">Examples</a></li>
    <li><a href="https://chatgpt.com/c/677ed9c5-7a84-800a-ad4d-5c9f6197b77f#best-practices">Best Practices</a></li>
  </ul>

  <hr>

  <h4>Introduction</h4>
  <p>Welcome to <strong>My Mini Framework</strong>! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.</p>
  
  <h5>Features</h5>
  <ul>
    <li><strong>Abstracting the DOM</strong></li>
    <li><strong>Routing System</strong></li>
    <li><strong>State Management</strong></li>
    <li><strong>Event Handling</strong></li>
  </ul>
  
  <hr>

  <h4>Installation & Setup</h4>
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

  <h4>Core Modules</h4>
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

  <hr>

  <h4>API Reference</h4>
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

  <h4>Examples</h4>
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

  <h4>Best Practices</h4>
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

const STORAGE_KEY = "todos";

export function toDoListPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create content for Page 3
  const container = createElement("div");
  setAttribute(container, "class", "main-container");

  // Sidebar
  const sidebar = createElement("aside");
  setAttribute(sidebar, "class", "sidebar");

  const filtersContainer = createElement("div");
  setAttribute(filtersContainer, "class", "filters-container");
  const filtersHeader = createElement("h3");
  filtersHeader.textContent = "Filters";

  const filtersList = createElement("ul");
  setAttribute(filtersList, "class", "filters");

  const allFilter = createElement("li");
  const allLink = createElement("a");
  setAttribute(allLink, "href", "#/toDoListPage");
  allLink.classList.add("selected");
  allLink.textContent = "All";

  const activeFilter = createElement("li");
  const activeLink = createElement("a");
  setAttribute(activeLink, "href", "#/toDoListPage/active");
  activeLink.textContent = "Active";

  const completedFilter = createElement("li");
  const completedLink = createElement("a");
  setAttribute(completedLink, "href", "#/toDoListPage/completed");
  // window.location.hash = "#/completed";
  completedLink.textContent = "Completed";

  appendChild(filtersList, allFilter);
  appendChild(allFilter, allLink);
  appendChild(filtersList, activeFilter);
  appendChild(activeFilter, activeLink);
  appendChild(filtersList, completedFilter);
  appendChild(completedFilter, completedLink);

  appendChild(filtersContainer, filtersHeader);
  appendChild(filtersContainer, filtersList);

  appendChild(sidebar, filtersContainer);

  // Main Content
  const mainContent = createElement("main");
  setAttribute(mainContent, "class", "main-content");

  // Input container
  const inputContainer = createElement("div");
  setAttribute(inputContainer, "class", "input-container");
  const todoInput = createElement("input");
  setAttribute(todoInput, "type", "text");
  setAttribute(todoInput, "id", "todo-input");
  setAttribute(todoInput, "placeholder", "Add a new todo...");
  const addButton = createElement("button");
  setAttribute(addButton, "id", "add-todo-btn");
  addButton.textContent = "Add";

  appendChild(inputContainer, todoInput);
  appendChild(inputContainer, addButton);

  // Options container
  const optionsContainer = createElement("div");
  setAttribute(optionsContainer, "id", "options");
  setAttribute(optionsContainer, "class", "options-container");

  const remainingItems = createElement("p");
  setAttribute(remainingItems, "class", "option remaining-items");

  const markAllButton = createElement("button");
  setAttribute(markAllButton, "class", "option mark-all-completed");
  const markAllIcon = createElement("i");
  setAttribute(markAllIcon, "class", "fa fa-check-square");
  markAllButton.appendChild(markAllIcon);
  markAllButton.appendChild(document.createTextNode("Mark all as completed"));  // Add the text after the icon

  const clearCompletedButton = createElement("button");
  setAttribute(clearCompletedButton, "class", "option clear-completed");
  const clearIcon = createElement("i");
  setAttribute(clearIcon, "class", "fa fa-eraser");
  clearCompletedButton.appendChild(clearIcon);
  clearCompletedButton.appendChild(document.createTextNode("Clear Completed"));  // Add the text after the icon


  const clearAllButton = createElement("button");
  setAttribute(clearAllButton, "class", "option clear-all");
  const trashIcon = createElement("i");
  setAttribute(trashIcon, "class", "fa fa-trash");
  clearAllButton.appendChild(trashIcon);  // Append the icon first
  clearAllButton.appendChild(document.createTextNode(" Clear All"));  // Add the text after the icon  
  
  appendChild(optionsContainer, remainingItems);
  appendChild(optionsContainer, markAllButton);
  appendChild(optionsContainer, clearCompletedButton);
  appendChild(optionsContainer, clearAllButton);

  // Todo list container
  const todoListContainer = createElement("div");
  setAttribute(todoListContainer, "id", "toDos-container");

  const todoList = createElement("ul");
  setAttribute(todoList, "id", "todo-list");

  appendChild(todoListContainer, todoList);

  appendChild(mainContent, inputContainer);
  appendChild(mainContent, optionsContainer);
  appendChild(mainContent, todoListContainer);

  appendChild(container, sidebar);
  appendChild(container, mainContent);

  appendChild(root, container);

  // Footer
  const footer = createElement("footer");
  setAttribute(footer, "class", "info");
  const footerText1 = createElement("p");
  footerText1.textContent = "Double-click to edit a todo";
  const footerText2 = createElement("p");
  footerText2.textContent = "Created using Mini Framework";

  appendChild(footer, footerText1);
  appendChild(footer, footerText2);

  appendChild(root, footer);

  // Initialize app and render todos with filters after the page has fully loaded
  // window.addEventListener('DOMContentLoaded', () => {
  //   initApp(); // Initialize the app after the DOM is fully loaded
  // });
  const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  let initialFilter = location.hash.replace("#/toDoListPage/", "");
  if (initialFilter == "#/toDoListPage") initialFilter = "all";

  const store = new Store(
    {
      todos: savedTodos,
      filter: initialFilter,
      lastChangedProp: null,
    },
    [localStorageMiddleware(STORAGE_KEY)]
  );

  setupEventHandlers(store);

  // Initial render of todos
  renderTodos(store.getState().todos, store.getState().filter);

  // Subscribe to store changes to re-render todos
  store.subscribe((state) => {
    if (state.lastChangedProp === "todos") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
      // Force a fresh render with the latest state
      window.requestAnimationFrame(() => {
        renderTodos(state.todos, state.filter);
      });
    } else if (state.lastChangedProp === "filter") {
      if (state.filter == "") state.filter = "all";
      renderFilters(state.filter);
      renderTodos(state.todos, state.filter);
    }
  });

  // Listen to hash changes to update filter
  window.addEventListener("hashchange", () => {
    let newFilter = location.hash.replace("#/toDoListPage/", "");
    if (newFilter == "#/toDoListPage"){
      newFilter = "all";
    }
    store.setState({ filter: newFilter, lastChangedProp: "filter" });
    renderFilters(newFilter);
  });
}

// Add routes first
router.addRoute("/", loginPage);
router.addRoute("/home", homePage);
router.addRoute("/about", aboutUsPage);
router.addRoute("/documentation", documentationPage);
router.addRoute("/toDoListPage", toDoListPage);
router.addRoute("/toDoListPage/completed", toDoListPage);
router.addRoute("/toDoListPage/active", toDoListPage);

// Initialize the router
router._loadInitialRoute();

function setupEventHandlers(store) {
  // Handle 'Enter' key to add todos
  eventEmitter.on("addTodo", (title) => {
    if (title.trim()) {
      const newTodo = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      };

      const updatedTodos = [...store.getState().todos, newTodo];
      store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
    }
  });

  // Bind input keypress event
  const inputElement = document.getElementById("todo-input");
  let addBtn = document.getElementById("add-todo-btn");

  addEventListener(addBtn, "click", () => {
    eventEmitter.emit("addTodo", inputElement.value.trim());
    inputElement.value = "";
  });

  addEventListener(inputElement, "keypress", (event) => {
    if (event.key === "Enter") {
      eventEmitter.emit("addTodo", event.target.value);
      event.target.value = "";
    }
  });

  // Handle delete todo
  eventEmitter.on("deleteTodo", (id) => {
    const updatedTodos = store
      .getState()
      .todos.filter((todo) => todo.id !== id);
    store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
  });

  // Delegate delete button clicks
  const todoList = document.getElementById("todo-list");
  delegate(todoList, ".delete", "click", (event) => {
    const id = Number(event.target.closest("li").id);
    eventEmitter.emit("deleteTodo", id);
  });

  // Handle checkbox toggle to mark todo as completed
  delegate(todoList, ".toggle", "change", (event) => {
    const id = Number(event.target.closest("li").id);
    const updatedTodos = store
      .getState()
      .todos.map((todo) =>
        todo.id == id ? { ...todo, completed: event.target.checked } : todo
      );

    store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
  });

  // toggle the checkbox when clicking on the <li>
  delegate(todoList, "li", "click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const checkbox = li.querySelector(".toggle");
    if (!checkbox) return;

    // Toggle the checkbox
    checkbox.checked = !checkbox.checked;

    // Emit the change event to update the store
    const id = Number(li.id);
    const updatedTodos = store
      .getState()
      .todos.map((todo) =>
        todo.id == id ? { ...todo, completed: checkbox.checked } : todo
      );

    store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
  });

  // Handle filter change
  const filterLinks = document.querySelectorAll(".filters a");
  filterLinks.forEach((link) => {
    addEventListener(link, "click", (event) => {
      const newFilter = event.target
        .getAttribute("href")
        .replace("index.html#/", "");
      store.setState({ filter: newFilter, lastChangedProp: "filter" });
    });
  });

  // Handle double-click to edit a to-do
  delegate(todoList, "label", "dblclick", (event) => {
    const label = event.target;
    const li = label.closest("li");
    if (!li) return;

    const id = Number(li.id);
    const todo = store.getState().todos.find((todo) => todo.id === id);
    if (!todo) return;

    // Replace the label with an input field
    const input = createElement("input", {
      class: "edit-input",
      type: "text",
      value: todo.title,
    });
    li.replaceChild(input, label);

    // Focus the input and select the text
    input.focus();
    input.select();

    // Save changes on blur or Enter key
    let isReplacing = false;

    const saveChanges = () => {
      if (isReplacing) return;

      const updatedTitle = input.value.trim();
      if (updatedTitle) {
        const updatedTodos = store
          .getState()
          .todos.map((todo) =>
            todo.id === id ? { ...todo, title: updatedTitle } : todo
          );

        store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
      }

      if (li.contains(input)) {
        isReplacing = true;
        li.replaceChild(label, input);
        label.textContent = updatedTitle || todo.title;
        isReplacing = false;
      }
    };

    input.addEventListener("blur", saveChanges);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveChanges();
      }
    });
  });

  // Mark all as completed
  const markCompleted = document.querySelector(".mark-all-completed");

  addEventListener(markCompleted, "click", () => {
    const todos = store.getState().todos.map((todo) => ({
      ...todo,
      completed: true,
    }));
    store.setState({ todos, lastChangedProp: "todos" });
  });

  // Clear all todos
  const clearAll = document.querySelector(".clear-all");
  addEventListener(clearAll, "click", () => {
    store.setState({ todos: [], lastChangedProp: "todos" });
  });

  // Bind click event to 'Clear Completed' button
  const clearCompletedBtn = document.querySelector(".clear-completed");
  addEventListener(clearCompletedBtn, "click", () => {
    const todos = store.getState().todos.filter((todo) => !todo.completed);
    store.setState({ todos, lastChangedProp: "todos" });
  });
}

function renderTodos(todos, filter) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear existing content

  // Add a section to display remaining tasks
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  document.querySelector(
    ".remaining-items"
  ).textContent = `${remainingCount} item${
    remainingCount === 1 ? "" : "s"
  } remaining`;
  if (remainingCount === 0) {
    if (todos.length > 0) {
      document.querySelector(".remaining-items").textContent = `All Done!`;
    } else {
      document.querySelector(".remaining-items").textContent = ``;
    }
  }

  let filteredTodos = [];
  if (filter == "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter == "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else {
    filteredTodos = todos; // all
  }

  if (filteredTodos.length === 0) {
    let msg = filter == "all" ? "No todos found" : `No ${filter} todos found`;
    todoList.innerHTML = `<li id='no-todos-msg'>${msg}</li>`;
    return;
  }

  filteredTodos.forEach((todo) => {
    // Create a virtual DOM node for the todo item
    const vNode = h(
      "li",
      { class: `todo ${todo.completed ? "completed" : ""}`, id: todo.id },
      h("input", {
        class: "toggle",
        type: "checkbox",
        ...(todo.completed ? { checked: true } : {}),
      }),
      h("label", {}, todo.title),
      h("i", {
        class: "fa fa-trash delete",
        title: "Delete",
        "aria-hidden": "true",
      })
    );

    // Render the virtual DOM node to an actual DOM element
    const element = render(vNode);

    // Append the rendered element to the todo list
    appendChild(todoList, element);
  });
}

function renderFilters(filter) {
  const filterLinks = document.querySelectorAll(".filters a");
  filterLinks.forEach((link) => {
    let filterValue = link.getAttribute("href").replace("#/toDoListPage/", "");
    if (filterValue == "#/toDoListPage") filterValue = "all";

    link.classList.toggle("selected", filter === filterValue);
  });
}
