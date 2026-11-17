// Offline support. Bump VERSION whenever index.html changes so phones pick up the new copy.
var VERSION = 'fly-shop-v6';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-32.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  var isFont = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  // Sync traffic and anything else from other sites is never cached.
  if (url.origin !== location.origin && !isFont) return;
  if (isFont) {
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (r) { c.put(req, r.clone()); return r; }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }
  // The app itself: try the network first so updates arrive, fall back to the saved copy offline.
  // cache:'no-store' skips the browser's own 10-minute cache so new versions show up right away.
  e.respondWith(fetch(req.url, { cache: 'no-store' }).then(function (r) {
    var copy = r.clone();
    caches.open(VERSION).then(function (c) { c.put(req, copy); });
    return r;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
