// Service worker de la Bitácora PDT.
// Guarda la app en caché para que abra sin internet. Los datos NO pasan por aquí:
// viven en localStorage y se sincronizan aparte contra la API de GitHub.
// Al publicar una versión nueva de la app, sube el número de CACHE para forzar la actualización.
const CACHE = "bitacora-pdt-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Las llamadas a GitHub siempre van a la red: nunca se sirven desde caché.
  if (url.hostname.endsWith("github.com") || url.hostname.endsWith("githubusercontent.com")) return;
  if (e.request.method !== "GET") return;

  // La app se sirve desde caché primero (arranca instantánea y sin red);
  // en segundo plano se refresca para la próxima apertura.
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const red = fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copia = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copia));
          }
          return res;
        })
        .catch(() => hit);
      return hit || red;
    })
  );
});
