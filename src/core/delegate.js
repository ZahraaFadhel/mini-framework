export function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}

// export function delegate(parent, selector, event, handler) {
//   parent.addEventListener(event, function (e) {
//     const target = e.target.closest(selector);
//     if (target && parent.contains(target)) {
//       handler(e);
//     }
//   });
// }
