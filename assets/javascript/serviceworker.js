var CACHE = 'cache-only';

 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

 
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});

 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
            './assets/css/materialize.min.css',
            './assets/javascript/events.js',
            './assets/javascript/fontawesome-all.min.js',
            './assets/javascript/jquery-3.3.1.min.js',
            './assets/javascript/materialize.min.js',
            './assets/javascript/moment.min.js',
    ]);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


