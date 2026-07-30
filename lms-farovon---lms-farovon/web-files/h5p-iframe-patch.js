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
  var pathPrefix = null;
  try { pathPrefix = new URL(V).pathname + '/'; } catch (e) {}

  function map(u) {
    if (typeof u !== 'string') return null;
    var fp = null;
    if (u.indexOf(prefix) === 0) fp = u.slice(prefix.length);
    else if (pathPrefix && u.indexOf(pathPrefix) === 0) fp = u.slice(pathPrefix.length);
    if (fp === null) return null;
    fp = fp.split('?')[0].split('#')[0];
    try { fp = decodeURIComponent(fp); } catch (e) {}
    if (P[fp]) return P[fp];
    console.warn('[H5P iframe] no blob for:', fp);
    return null;
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

  // setAttribute-хук: jQuery .attr('src') обходит property-сеттеры → ловим здесь.
  var _setAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if ((name === 'src' || name === 'href' || name === 'data') && typeof value === 'string') {
      var b = map(value);
      if (b) value = b;
    }
    return _setAttribute.call(this, name, value);
  };

  // Прототипные сеттеры src — ловят прямые property-сеты на любых элементах.
  [[window.HTMLImageElement, 'src'], [window.HTMLMediaElement, 'src'], [window.HTMLSourceElement, 'src'], [window.HTMLTrackElement, 'src']].forEach(function (pair) {
    try {
      if (!pair[0]) return;
      var proto = pair[0].prototype, attr = pair[1];
      var d = Object.getOwnPropertyDescriptor(proto, attr);
      if (!d || !d.set) return;
      Object.defineProperty(proto, attr, {
        configurable: true,
        get: d.get,
        set: function (v) { var b = map(v); d.set.call(this, b || v); }
      });
    } catch (e) {}
  });

  // ── MutationObserver: ловим <img>/<source> и пр., добавленные через innerHTML /
  //    setAttribute / jQuery (мимо document.createElement) — переписываем VBASE-src на blob.
  //    Именно так H5P рендерит картинки контента (content/images/*), поэтому без этого они 404. ──
  function rewriteEl(el) {
    if (!el || el.nodeType !== 1) return;
    var tag = el.tagName ? el.tagName.toLowerCase() : '';
    var attr = ATTR[tag];
    if (attr) {
      var b = map(el.getAttribute(attr));
      if (b && el.getAttribute(attr) !== b) el.setAttribute(attr, b);
    }
    if (el.getAttribute && el.getAttribute('srcset')) {
      var changed = false;
      var ss = el.getAttribute('srcset').split(',').map(function (part) {
        var seg = part.trim().split(/\s+/);
        var bb = map(seg[0]);
        if (bb) { seg[0] = bb; changed = true; }
        return seg.join(' ');
      }).join(', ');
      if (changed) el.setAttribute('srcset', ss);
    }
  }
  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    rewriteEl(root);
    if (root.querySelectorAll) {
      var els = root.querySelectorAll('img,source,video,audio,script,link,iframe,track');
      for (var i = 0; i < els.length; i++) rewriteEl(els[i]);
    }
  }
  try {
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'attributes') { rewriteEl(m.target); }
        else { for (var j = 0; j < m.addedNodes.length; j++) scan(m.addedNodes[j]); }
      }
    });
    function startObserve() {
      var target = document.documentElement || document.body;
      if (!target) return;
      mo.observe(target, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'href', 'srcset'] });
      scan(document.body || document.documentElement);
    }
    if (document.documentElement) startObserve();
    document.addEventListener('DOMContentLoaded', function () { scan(document.body || document.documentElement); });
  } catch (e) { console.warn('[H5P iframe] MutationObserver setup failed:', e); }

  console.log('[H5P iframe] blob rewriter active (+MutationObserver), VBASE:', V, ', blobs:', Object.keys(P).length);
})();
