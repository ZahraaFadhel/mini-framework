import Router from '../src/core/router.js';

const router = new Router();

router.addRoute('/', () => {
  document.body.innerHTML = '<h1>Home Page</h1>';
});

router.addRoute('/about', () => {
  document.body.innerHTML = '<h1>About Page</h1>';
});

router.addRoute('/contact', () => {
  document.body.innerHTML = '<h1>Contact Page</h1>';
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <nav>
      <a href="/" data-link>Home</a>
      <a href="/about" data-link>About</a>
      <a href="/contact" data-link>Contact</a>
    </nav>
    <div id="content"></div>
  `;

  document.querySelectorAll('a[data-link]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const path = anchor.getAttribute('href');
      router.navigate(path);
    });
  });
});