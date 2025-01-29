import {
  createElement,
  setAttribute,
  appendChild,
  addEventListener,
} from "../../../src/core/dom.js";
import { delegate } from "../../../src/core/delegate.js";
import Store from "../../../src/core/store.js";
import { localStorageMiddleware } from "../store/middleware.js";
import { STORAGE_KEY } from "../main.js";
import { eventEmitter } from "../main.js";
import { h, render } from "../../../src/core/virtualDom.js";

export function toDoListPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create back button
  const backButton = createElement("button");
  setAttribute(backButton, "id", "back-button");
  backButton.textContent = "← Back";
  backButton.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:8080/#/home";
  });

  root.appendChild(backButton);
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
  markAllButton.appendChild(document.createTextNode("Mark all as completed")); // Add the text after the icon

  const clearCompletedButton = createElement("button");
  setAttribute(clearCompletedButton, "class", "option clear-completed");
  const clearIcon = createElement("i");
  setAttribute(clearIcon, "class", "fa fa-eraser");
  clearCompletedButton.appendChild(clearIcon);
  clearCompletedButton.appendChild(document.createTextNode("Clear Completed")); // Add the text after the icon

  const clearAllButton = createElement("button");
  setAttribute(clearAllButton, "class", "option clear-all");
  const trashIcon = createElement("i");
  setAttribute(trashIcon, "class", "fa fa-trash");
  clearAllButton.appendChild(trashIcon); // Append the icon first
  clearAllButton.appendChild(document.createTextNode(" Clear All")); // Add the text after the icon

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
    if (newFilter == "#/toDoListPage") {
      newFilter = "all";
    }
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

  
// Clear all todos on page load
document.addEventListener("DOMContentLoaded", () => {
  store.setState({ todos: [], lastChangedProp: "todos" });
});

  // Mark all as completed or uncompleted
  const markCompleted = document.querySelector(".mark-all-completed");
  let firstClick = true; // Flag to track if this is the first click

  addEventListener(markCompleted, "click", () => {
    const currentTodos = store.getState().todos;
    const allCompleted = currentTodos.every(todo => todo.completed); // Check if all are completed

    if (firstClick) {
      // First click logic
      if (allCompleted) {
        // If all were completed, toggle to uncompleted
        const updatedTodos = currentTodos.map(todo => ({
          ...todo,
          completed: false,
        }));
        store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
      } else {
        // If not all are completed, toggle to completed
        const updatedTodos = currentTodos.map(todo => ({
          ...todo,
          completed: true,
        }));
        store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
      }
      firstClick = false; // Set the flag to false after the first click
    } else {
      // Subsequent clicks logic
      if (allCompleted) {
        // If all are completed, mark them all uncompleted
        const updatedTodos = currentTodos.map(todo => ({
          ...todo,
          completed: false,
        }));
        store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
      } else {
        // If not all are completed, mark them all as completed
        const updatedTodos = currentTodos.map(todo => ({
          ...todo,
          completed: true,
        }));
        store.setState({ todos: updatedTodos, lastChangedProp: "todos" });
      }
    }
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
  if (!todoList) {
    console.warn("todo-container not found!");
    return;
  }
  todoList.innerHTML = ""; // Clear existing content

  // Add a section to display remaining tasks
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  document.querySelector(
    ".remaining-items"
  ).textContent = `${remainingCount} item${remainingCount === 1 ? "" : "s"
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

