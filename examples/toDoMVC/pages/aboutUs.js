import {
  createElement,
  setAttribute,
  appendChild,
} from "../../../src/core/dom.js";

// About Us Page Function
export function aboutUsPage() {
  const root = document.getElementById("app");
  root.innerHTML = ""; // Clear previous content

  // Create container for About Us page
  const container = createElement("div");
  setAttribute(container, "class", "container");

  // Create back button
  const backButton = createElement("button");
  setAttribute(backButton, "id", "back-button");
  backButton.textContent = "← Back";
  backButton.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:8080/#/home";
  });

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
  appendChild(container, backButton); // Add back button at the top
  appendChild(container, header);
  appendChild(content, description);
  appendChild(content, teamIntro);
  appendChild(content, footer);
  appendChild(container, content);

  // Append the container to the root element
  appendChild(root, container);
}
