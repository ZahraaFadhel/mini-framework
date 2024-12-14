import EventEmitter from '../core/events.js';
import { delegate } from '../core/delegate.js';

const eventEmitter = new EventEmitter();

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <div>
      <button class="btn" data-action="increment">Increment</button>
      <button class="btn" data-action="decrement">Decrement</button>
      <h1>Count: <span id="count">0</span></h1>
    </div>
  `;

  let count = 0;

  eventEmitter.on('increment', () => {
    count += 1;
    document.getElementById('count').textContent = count;
  });

  eventEmitter.on('decrement', () => {
    count -= 1;
    document.getElementById('count').textContent = count;
  });

  delegate(document.body, '.btn', 'click', (e) => {
    const action = e.target.getAttribute('data-action');
    eventEmitter.emit(action);
  });
});