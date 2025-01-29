import {
  createElement,
  setAttribute,
  appendChild,
} from "../../../src/core/dom.js";

import { router } from "../main.js";

export function loginPage() {
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
