# Mini-Framework Development Project

This document outlines the steps and provides documentation to create your own mini-framework. The project is divided into several phases to ensure smooth progress and adherence to the specified requirements.

---

- double click to edit ✓
- complete cross through ✓
- filter ✓
- no result msg ✓
- couting for remaining tasks ✓
- mark all as completed ✓
- clear all completed ✓
- clear all ✓
- change their order by dragging

## Project To-Do List

### 1. **Set Up Project Environment**
- Create a new project directory.
- Initialize a Git repository for version control.
- Set up a basic folder structure:
  ```
  /project-root
  |-- /src
  |   |-- /core
  |   |-- /examples
  |-- /docs
  |-- index.html
  |-- app.js
  |-- styles.css
  ```
- Install tools for bundling (e.g., Webpack or Parcel) and set up Babel if needed for ES6+ compatibility.

### 2. **Abstracting the DOM**
- Implement functions for creating and manipulating DOM elements.
- Define a Virtual DOM system for efficient updates.
- Create methods for:
  - Adding attributes.
  - Nesting elements.
  - Handling events.
- Test DOM abstraction by creating simple elements programmatically.

### 3. **Routing System**
- Implement a router to synchronize URL changes with application state.
- Create functions to define routes and dynamically load content based on the current URL.
- Test routing by creating multiple pages and navigating between them.

### 4. **State Management**
- Implement a central store for managing the state.
- Create methods to:
  - Update state.
  - Subscribe to state changes.
  - Access the current state.
- Test state management by binding state changes to UI updates.

### 5. **Event Handling**
- Create a custom event handling system to manage user interactions.
- Implement event delegation for better performance.
- Test event handling by creating interactive components (e.g., buttons or forms).

### 6. **TodoMVC Example**
- Use the framework to create a functional TodoMVC application.
- Include features like:
  - Adding tasks.
  - Editing tasks.
  - Deleting tasks.
  - Marking tasks as complete/incomplete.
  - Filtering tasks.

### 7. **Documentation**
- Write detailed documentation for the framework.
- Include code examples for:
  - Creating elements.
  - Nesting elements.
  - Adding attributes.
  - Handling events.
- Provide an overview of the framework's architecture and design decisions.

### 8. **Testing and Debugging**
- Test the framework on different browsers and devices.
- Debug any issues and ensure compliance with project requirements.

---

## Framework Documentation

### Introduction
Welcome to **My Mini Framework**! This framework simplifies web development by abstracting the DOM, managing state, and providing a robust routing system. Below are instructions and examples to help you get started.

### Features
1. **Abstracting the DOM**
2. **Routing System**
3. **State Management**
4. **Event Handling**

### Getting Started
#### Setting Up
1. Include the framework script in your HTML:
   ```html
   <script src="app.js"></script>
   ```
2. Initialize the framework in your script:
   ```javascript
   const app = new MyFramework();
   ```

### API Documentation

#### 1. **Creating Elements**
Use the `createElement` method to create DOM elements:
```javascript
const element = app.createElement('div', {
  class: 'container',
  id: 'main-container'
}, [
  app.createElement('h1', {}, ['Welcome to My Framework']),
  app.createElement('button', { onClick: () => alert('Hello!') }, ['Click Me'])
]);
app.mount(element, document.body);
```

#### 2. **Handling Events**
Custom event handling simplifies adding and managing events:
```javascript
app.on('buttonClick', () => console.log('Button clicked!'));
const button = app.createElement('button', {
  onClick: () => app.trigger('buttonClick')
}, ['Click Me']);
app.mount(button, document.body);
```

#### 3. **State Management**
Centralized state management keeps your app predictable:
```javascript
app.state = {
  count: 0
};

app.subscribe('count', (newValue) => {
  console.log('Count updated:', newValue);
});

app.updateState('count', app.state.count + 1);
```

#### 4. **Routing**
Define routes and their corresponding views:
```javascript
app.addRoute('/', () => app.createElement('h1', {}, ['Home Page']));
app.addRoute('/about', () => app.createElement('h1', {}, ['About Page']));
app.startRouting();
```

### TodoMVC Example
Here is how to create a TodoMVC using the framework:
```javascript
const todoApp = app.createElement('div', {}, [
  app.createElement('input', { id: 'new-todo', placeholder: 'What needs to be done?' }, []),
  app.createElement('button', { onClick: addTodo }, ['Add Todo']),
  app.createElement('ul', { id: 'todo-list' }, [])
]);

function addTodo() {
  const todoText = document.getElementById('new-todo').value;
  const todoItem = app.createElement('li', {}, [todoText]);
  app.mount(todoItem, document.getElementById('todo-list'));
}

app.mount(todoApp, document.body);
```

---

### Why Things Work This Way
1. **Abstracting the DOM**: Provides a cleaner interface to interact with DOM elements.
2. **Virtual DOM**: Efficiently updates only the parts of the UI that have changed.
3. **State Management**: Ensures that data is consistent and easily accessible across the app.
4. **Routing System**: Synchronizes the application state with the URL for a better user experience.



