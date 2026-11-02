// Runs synchronously in <head> (before first paint) to avoid a flash of the wrong theme.
// External file because the CSP is `script-src 'self'` (no inline scripts).
(function () {
  var theme = 'light';
  try {
    var match = document.cookie.match(/(?:^|;\s*)eduassets-theme=(light|dark)/);
    theme = match ? match[1]
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
})();
