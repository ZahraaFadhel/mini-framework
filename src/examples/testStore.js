import Store from '../core/store';

// Initial state
const initialState = {
  count: 0
};

// Create store
const store = new Store(initialState);

// Subscribe to state changes
store.subscribe(state => {
  document.getElementById('count').textContent = state.count;
});

// Update state
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <div>
      <h1>Count: <span id="count">${store.getState().count}</span></h1>
      <button id="increment">Increment</button>
      <button id="decrement">Decrement</button>
    </div>
  `;

  document.getElementById('increment').addEventListener('click', () => {
    store.setState({ count: store.getState().count + 1 });
  });

  document.getElementById('decrement').addEventListener('click', () => {
    store.setState({ count: store.getState().count - 1 });
  });
});