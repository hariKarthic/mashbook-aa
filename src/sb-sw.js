var CACHE_NAME = 'scrapbook-v1';
var urlsToCache = [
  '/'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        //To forces the waiting service worker to become the active service worker
        return self.skipWaiting();
      }).catch(error => {
        console.log(error);
      })
  );
});

self.addEventListener('fetch', (event) => {

  var request = event.request;
  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      cache
        .put(request, response.clone())
        .catch(function () { });
      return response;
    })
      .catch(function () {
        return cache
          .match(request)
          .then(function (response) {
            return response;
          });
      })
  }));
});