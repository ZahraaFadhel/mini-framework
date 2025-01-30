import {
  createElement,
  setAttribute,
  appendChild,
} from "../../../src/core/dom.js";
import { router } from "../main.js";
// Home Page Function
export function homePage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create home container
  const container = createElement("div");
  setAttribute(container, "class", "container");

  // Create header for Home
  const header = createElement("h1");
  setAttribute(header, "class", "page-header");

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
