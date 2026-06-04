/* Placeholder service worker response for third-party probes.
   This app does not register a service worker. */
self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})
