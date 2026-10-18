// Runs synchronously in <head> (before first paint) to avoid a flash of the wrong theme.
// External file because the CSP is `script-src 'self'` (no inline scripts).
(function () {
  var theme = 'light';
  try {
    var saved = localStorage.getItem('eduassets-theme');
    theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
})();
