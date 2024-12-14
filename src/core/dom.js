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
  
  export function setAttribute(element, key, value) {
    element.setAttribute(key, value);
  }
  
  export function appendChild(parent, child) {
    parent.appendChild(child);
  }
  
  export function addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
  }