import { appendChild, addEventListener } from "../../src/core/dom.js";
import { h, render } from "../../src/core/virtualDom.js";
import { localStorageMiddleware } from "./store/middleware.js";
import Store from "../../src/core/store.js";
import EventEmitter from "../../src/core/events.js";
import { delegate } from "../../src/core/delegate.js";

const STORAGE_KEY = "todos";
const eventEmitter = new EventEmitter();

if (document.readyState === "loading") {
  addEventListener(document, "DOMContentLoaded", initApp);
} else {
  initApp();
}

function initApp() {
  const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const initialFilter = location.hash.replace("#/", "") || "all";

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
      renderFilters(state.filter);
      renderTodos(state.todos, state.filter);
    }
  });

  // Listen to hash changes to update filter
  window.addEventListener("hashchange", () => {
    let newFilter = location.hash.replace("#/", "");
    if(newFilter == "")
      newFilter = "all";
    console.log("newFilter", newFilter);
    store.setState({ filter: newFilter, lastChangedProp: "filter" });
    renderFilters(newFilter);
  });
}

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

  // Handle filter change
  const filterLinks = document.querySelectorAll(".filters a");
  filterLinks.forEach((link) => {
    addEventListener(link, "click", (event) => {
      event.preventDefault();
      const newFilter = event.target.getAttribute("href").replace("#/", "");
      store.setState({ filter: newFilter, lastChangedProp: "filter" });
    });
  });
}

function renderTodos(todos, filter) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear existing content

  let filteredTodos = [];
  if (filter == "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter == "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else {
    filteredTodos = todos; // all
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
    let filterValue = link.getAttribute("href").replace("#/", "");
    if(filterValue == "")
      filterValue = "all";
    link.classList.toggle("selected", filter === filterValue);
  });
}
