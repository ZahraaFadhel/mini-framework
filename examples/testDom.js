import { createElement, setAttribute, appendChild, addEventListener } from '../src/core/dom.js';
import { h, render } from '../src/core/virtualDom.js';

// Create elements using utility functions
const div = createElement('div', { class: 'container' }, 'Hello, World!');
setAttribute(div, 'id', 'main-container');
appendChild(document.body, div);

// Create elements using Virtual DOM
const vNode = h('div', { class: 'container' }, 'Hello, Virtual DOM!', h('h3', { class: "someclass" }, 'This is an h3.'), h('p', { class: "someclass" }, 'This is a paragraph.'));
console.log('vNode working ', vNode);
const element = render(vNode);
appendChild(document.body, element);

// Add event listener
addEventListener(div, 'click', () => alert('Div clicked!'));