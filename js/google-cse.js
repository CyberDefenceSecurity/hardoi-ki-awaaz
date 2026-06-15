/* ============================================
   Hardoi ki Awaaz - Google Custom Search Element
   User's custom config: image search, overlay, popup layout
   CX ID: 137070bc808794021
   ============================================ */

window.__gcse = window.__gcse || {};
window.__gcse.ct = Date.now();

(function() {
  var cx = '137070bc808794021';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();

// Apply user's custom config when GCSE loads
window.__gcse.init = function() {
  google.search.cse.element.init({
    cx: '137070bc808794021',
    language: 'hi',
    theme: 'V2_DEFAULT',
    uiOptions: {
      enableImageSearch: true,
      imageSearchLayout: 'popup',
      overlayResults: true,
      isSafeSearchActive: true
    }
  });
};
