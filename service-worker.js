// Handle offline mode for application
const CACHE_NAME = "todo";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/icons/icon-512x512.png",
];

// caching the urls
self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Caching URLs.");
      return cache.addAll(urlsToCache);
    })
  );
});

// read the cached urls
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("push", function (event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body,
    icon: "/icons/icon-512x512.png",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
