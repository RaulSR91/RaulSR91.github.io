const CACHE_NAME = "PROCESAGRAM_CACHE";

self.addEventListener("install",(evt)=>{

//El waitUntil es similar al return pero de este evento
  //
  //El waitUntil es similar al return pero de este evento
  evt.waitUntil(
    (async function install() {
      let cache = await self.caches.open(CACHE_NAME);
      return cache.addAll([
      "manifest.json",
      "index.html",
      "style.css",
      "/node_modules/bootstrap/dist/css/bootstrap.css",
      "camera.js"
    ]);
    })()
  );


   // self.skipWaiting();
})
self.addEventListener("activate",(event)=>{
    event.waitUntil(self.clients.claim());
})

self.addEventListener("fetch",(evt)=>{
     //caso 1 : Si estoy offline devuelvo el index del cache
  if (!navigator.onLine && evt.request.url.includes("index.html")||
      !navigator.onLine && evt.request.url.includes("style.css")||
      !navigator.onLine && evt.request.url.includes("bootstrap.css")||
      !navigator.onLine && evt.request.url.includes("manifest.json")||
      !navigator.onLine && evt.request.url.includes("camera.js")
  ) {
    evt.respondWith(
      (async () => {
        console.log("SW", "Fetch", evt.request.url);
        var cache = await self.caches.open(CACHE_NAME);
        var match = await cache.match(evt.request);
        if (match) return match;
      })()
    );
  }
})