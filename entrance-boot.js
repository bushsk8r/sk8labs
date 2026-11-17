// render-blocking classic script, loaded in <head> (CSP: no inline script).
// marks the page as scripted and in the ride phase before first paint, so the two ways in
// are never flashed; then arms a fallback so a failed entrance.js never strands the visitor.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  root.dataset.phase = "ride";

  function unstrand() {
    if (window.__entranceBooted) return;
    root.classList.remove("js");
    delete root.dataset.phase;
  }
  setTimeout(unstrand, 3000);
  // a module that fails to load or throws at start-up fires an error event (capture: a
  // script element's load error does not bubble)
  addEventListener("error", unstrand, true);
})();
