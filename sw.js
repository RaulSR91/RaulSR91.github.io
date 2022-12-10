const CACHE_NAME = "PROCESAGRAM_CACHE";

self.addEventListener("install",()=>{

//El waitUntil es similar al return pero de este evento
  //
  evt.waitUntil(
    self.caches.open(CACHE_NAME).then((cache) => {
      //Acá se guarda el cache del service worker
      return cache.addAll([
        "index.html",
        "style.css"
      ]);
    })
  );


    self.skipWaiting();
})
self.addEventListener("activate",(event)=>{
    event.waitUntil(self.clients.claim());
})

self.addEventListener("fetch",()=>{
     //caso 1 : Si estoy offline devuelvo el index del cache
  if (!navigator.onLine && evt.request.url.includes("index.html")) {
    evt.respondWith(
      (async () => {
        console.log("SW", "Fetch", evt.request.url);
        var cache = await self.caches.open(CACHE);
        var match = await cache.match(evt.request);
        if (match) return match;
      })()
    );
  }
})