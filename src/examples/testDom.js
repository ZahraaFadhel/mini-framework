import { createElement, setAttribute, appendChild, addEventListener } from '../core/dom.js';
import { h, render } from '../core/virtualDom.js';

// Create elements using utility functions
const div = createElement('div', { class: 'container' }, 'Hello, World!');
setAttribute(div, 'id', 'main-container');
appendChild(document.body, div);

// Create elements using Virtual DOM
const vNode = h('div', { class: 'container' }, 'Hello, Virtual DOM!');
const element = render(vNode);
appendChild(document.body, element);

// Add event listener
addEventListener(div, 'click', () => alert('Div clicked!'));