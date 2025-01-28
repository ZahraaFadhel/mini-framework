export function delegate(parent, selector, event, handler) {
  if (parent) {
      parent.addEventListener(event, function (e) {
          if (e.target.matches(selector)) {
              handler(e);
          }
      });
  } else {
      console.warn('Parent element not found. Event listener not added.');
  }
}


// export function delegate(parent, selector, event, handler) {
//   parent.addEventListener(event, function (e) {
//     const target = e.target.closest(selector);
//     if (target && parent.contains(target)) {
//       handler(e);
//     }
//   });
// }
