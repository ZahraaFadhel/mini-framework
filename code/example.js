import { createElement, setAttribute, appendChild } from "../src/core/dom.js";
import { h, render } from "../src/core/virtualDom.js";
// import { localStorageMiddleware } from "./store/middleware.js";
import Store from "../src/core/store.js";
import addEventListener from "../src/core/events.js";
import { delegate } from "../src/core/delegate.js";

// Initialize Router
const router = new Router();

// Define Routes
router.addRoute('/', renderLoginPage);
router.addRoute('/home', renderHomePage);
router.addRoute('/add-todo', () => console.log('Navigate to Add To-Do Page'));
router.addRoute('/view-todos', () => console.log('Navigate to View To-Do Page'));
router.addRoute('/clear-todos', () => console.log('Navigate to Clear To-Do Page'));

// Login Page
function renderLoginPage() {
    const root = document.getElementById('app');
    root.innerHTML = '';

    const title = createElement('h1', {}, 'Login');
    const input = createElement('input', { type: 'text', placeholder: 'Enter your nickname', id: 'nickname' });
    const button = createElement('button', {}, 'Login');

    addEventListener(button, 'click', () => {
        const nickname = document.getElementById('nickname').value;
        if (nickname.trim()) {
            router.navigate('/home');
        } else {
            alert('Please enter a nickname.');
        }
    });

    appendChild(root, title);
    appendChild(root, input);
    appendChild(root, button);
}

// Home Page
function renderHomePage() {
    const root = document.getElementById('app');
    root.innerHTML = '';

    const title = createElement('h1', {}, 'Home');
    const addButton = createElement('button', {}, 'Add To-Do');
    const viewButton = createElement('button', {}, 'View To-Dos');
    const clearButton = createElement('button', {}, 'Clear To-Dos');

    addEventListener(addButton, 'click', () => router.navigate('/add-todo'));
    addEventListener(viewButton, 'click', () => router.navigate('/view-todos'));
    addEventListener(clearButton, 'click', () => router.navigate('/clear-todos'));

    appendChild(root, title);
    appendChild(root, addButton);
    appendChild(root, viewButton);
    appendChild(root, clearButton);
}

// Load Initial Route
router._loadInitialRoute();