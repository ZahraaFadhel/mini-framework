export function h(tag, props, ...children) {
  return { tag, props, children };
}

export function render(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  const { tag, props, children } = vNode;
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    element.setAttribute(key, props[key]);
  });

  children.forEach(child => {
    element.appendChild(render(child));
  });

  return element;
}