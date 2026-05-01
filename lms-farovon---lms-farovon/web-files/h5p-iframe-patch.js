// H5P iframe blob-URL rewriter.
// Loaded inside the iframe srcdoc BEFORE frame.bundle.js.
// Rewrites VBASE-prefixed URLs (libraries, content assets) to blob URLs from parent.
(function () {
  var P = parent && parent.__h5pBlobs;
  var V = parent && parent.__h5pVBASE;
  if (!P || !V) {
    console.warn('[H5P iframe] parent.__h5pBlobs / __h5pVBASE not found — rewriter skipped');
    return;
  }
  var prefix = V + '/';

  function map(u) {
    if (typeof u !== 'string') return null;
    if (u.indexOf(prefix) !== 0) return null;
    var fp = u.slice(prefix.length).split('?')[0];
    return P[fp] || null;
  }

  var ATTR = {
    script: 'src', link: 'href',
    img: 'src', video: 'src', audio: 'src', source: 'src',
    iframe: 'src', track: 'src'
  };

  var _create = document.createElement.bind(document);
  document.createElement = function (tag) {
    var el = _create(tag);
    var lower = (tag || '').toLowerCase();
    var attr = ATTR[lower];
    if (attr) {
      var stored = '';
      try {
        Object.defineProperty(el, attr, {
          configurable: true,
          get: function () { return stored; },
          set: function (val) {
            var b = map(val);
            if (b) val = b;
            stored = val;
            el.setAttribute(attr, val);
          }
        });
      } catch (e) {}
    }
    return el;
  };

  var _fetch = window.fetch && window.fetch.bind(window);
  if (_fetch) {
    window.fetch = function (input, init) {
      var u = typeof input === 'string' ? input
            : (input && input.url) ? input.url : String(input);
      var b = map(u);
      if (b) return _fetch(b, init);
      return _fetch.apply(this, arguments);
    };
  }

  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var b = map(url);
    if (b) arguments[1] = b;
    return _open.apply(this, arguments);
  };

  console.log('[H5P iframe] blob rewriter active, VBASE:', V, ', blobs:', Object.keys(P).length);
})();
