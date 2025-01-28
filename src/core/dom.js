export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag);

  // Set attributes if any
  Object.keys(props).forEach(key => {
      element.setAttribute(key, props[key]);
  });

  // Append children: Handle both string (text) and element nodes
  children.forEach(child => {
      if (typeof child === 'string') {
          // Append as text node if it's a string
          element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
          // Append as element node if it's a valid DOM node
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
  if (element) {
      element.addEventListener(event, handler);
  } else {
      console.warn('Element not found, cannot add event listener');
  }
}
