importScripts("./data/games.js");
// files to cache
var cacheName = "js13kPWA-v5";
// 无线也能工作需要的资源
var appShellFiles = [
  '/js13kpwa/',
  '/js13kpwa/index.html',
  '/js13kpwa/app.js',
  '/js13kpwa/style.css',
  '/js13kpwa/fonts/graduate.eot',
  '/js13kpwa/fonts/graduate.ttf',
  '/js13kpwa/fonts/graduate.woff',
  '/js13kpwa/favicon.ico',
  '/js13kpwa/img/js13kgames.png',
  '/js13kpwa/img/bg.png',
  '/js13kpwa/icons/icon-32.png',
  '/js13kpwa/icons/icon-64.png',
  '/js13kpwa/icons/icon-96.png',
  '/js13kpwa/icons/icon-128.png',
  '/js13kpwa/icons/icon-168.png',
  '/js13kpwa/icons/icon-192.png',
  '/js13kpwa/icons/icon-256.png',
  '/js13kpwa/icons/icon-512.png'
];
var gamesImages = [];
for (var i = 0; i < games.length; i++) {
  gamesImages.push("/js13kpwa/data/img/" + games[i].slug + ".jpg");
}
var contentToCache = appShellFiles.concat(gamesImages);
console.log({ contentToCache, gamesImages })
// Installing Service Worker
self.addEventListener("install", function (e) {
  console.log(444)
  self.skipWaiting()
  console.log("[Service Worker] Install, include: " + registration.scope);
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      console.log(555)
      return cache.addAll(contentToCache);
    })
  )
})
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cName) {
          if (cacheName.indexOf(cName) === -1) {
            console.log("Delect: ", cName);
            return caches.delete(cName);
          }
        })
      )
    })
  )
})
// Fetching content using Service Worker
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.open(cacheName).then(function (cache) {
      console.log(111)
      return cache.match(e.request).then(function (r) {
        console.log(333, caches, e.request.url)
        // console.log("r: ", r, ";url:", e.request.url)
        // console.log("[Service Worker] Caching resource: " + e.request.url);
        return r || fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            if (!/^chrome-extension:/.test(e.request.url)) {
              // new resource
              cache.put(e.request, response.clone());
            }
            console.log(1111, e.request.url)
            return response;
          })
        })
      })
    })

  )
})