export function delegate(parent, selector, event, handler) {
    parent.addEventListener(event, function (e) {
      if (e.target.matches(selector)) {
        handler(e);
      }
    });
  }