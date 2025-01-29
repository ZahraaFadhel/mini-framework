import EventEmitter from "../../src/core/events.js";
import Router from "../../src/core/router.js";
import { loginPage } from "./pages/login.js";
import { homePage } from "./pages/home.js";
import { aboutUsPage } from "./pages/aboutUs.js";
import { documentationPage } from "./pages/doc.js";
import { toDoListPage } from "./pages/toDo.js";

// Initialize Router
export const router = new Router();

// Initialize EventEmitter
export const eventEmitter = new EventEmitter();

export const STORAGE_KEY = "todos";

// Add routes first
router.addRoute("/", loginPage);
router.addRoute("", loginPage);
router.addRoute("/home", homePage);
router.addRoute("/about", aboutUsPage);
router.addRoute("/documentation", documentationPage);
router.addRoute("/toDoListPage", toDoListPage);
router.addRoute("/toDoListPage/completed", toDoListPage);
router.addRoute("/toDoListPage/active", toDoListPage);

// Initialize the router
router._loadInitialRoute();
