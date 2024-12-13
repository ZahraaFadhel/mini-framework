// src/core/virtualDom.js

export function h(tag, props, ...children) {
    return { tag, props, children };
}

export function render(vNode) {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    const { tag, props, children } = vNode;
    const element = createElement(tag, props, ...children.map(render));

    return element;
}