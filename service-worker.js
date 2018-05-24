const CACHE_NAME = 'my-static-files';
const CACHE_DATA = 'my-data-cache';
var urlsToCache = [
  '/',
  '/app-compiled.js',
  '/css/estilo.css',
  '/js/artyom.window.min.js',
  '/js/jquery.min.js',
  '/js/jquery.easing.min.js',
  '/js/moment.min.js',
  '/js/moment-locale-pt-br.js',
  '/semantic/dist/semantic.min.js',
  '/semantic/dist/semantic.min.css',
  '/manifest.json'
];

self.addEventListener('install', function (event) {
  console.log(`Instalando Service Worker: ${event}`);

  return event.waitUntil(
    self.caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log(`Ativando Service Worker: ${event}`);

  var cacheWhiteList = [CACHE_NAME, CACHE_DATA];

  return event.waitUntil(
    self.caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return self.caches.delete(cacheName);
            }
          })
        );
      })
  );
});

self.addEventListener('fetch', function (event) {
  var dataUrl = 'https://testeurl.com';

  if (event.request.url.indexOf(dataUrl) === -1) {
    event.respondWith(
      self.caches.match(event.request)
        .then(function (response) {
          return response || self.fetch(event.request);
        })
    );
  } else {
    event.respondWith(
      self.fetch(event.request)
        .then(function (response) {
          return self.caches.open(CACHE_DATA)
            .then(function (cache) {
              cache.put(event.request.url, response.clone());
              return response;
            });
        }).catch(function (erro) {
          return self.caches.match(event.request);
        })
    );
  };
});
