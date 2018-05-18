const CACHE = 'my-static-files';
var urlsToCache = [
  '/',
  '/app-compiled.js',
  '/css/estilo.css',
  '/js/artyom.window.min.js',
  '/js/jquery.min.js',
  '/js/moment.min.js',
  '/js/moment-locale-pt-br.js',
  '/semantic/dist/semantic.min.js',
  '/semantic/dist/semantic.min.css'
];

self.addEventListener('install', function(event) {
  console.log(`Instalando Service Worker: ${event}`);

  return event.waitUntil(
    self.caches.open(CACHE)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log(`Ativando Service Worker: ${event}`);

  var cacheWhiteList = ['my-static-files'];

  return self.waitUntil(
    self.caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if(cacheWhiteList.indexOf(cacheName) === -1) {
              return self.caches.delete(cacheName);
            } 
          })
        );
      })
  );
});
