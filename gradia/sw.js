const CACHE_NAME = 'Beta 1.0.5.9.2';
const INFO = {
    get description() {
        return {de:`Dieses Update enthält Fehlerbehebungen${this.features.length < 1 ? `.`:` und führt diese neuen Features ein:`}`, en:`This update provides bug fixes${this.features.length < 1 ? `.`:` and introduces these new features:`}`}
    },
    features: [
        {name:{de:`Offline Modus`, en:`Offline mode`}, description:{de:`Ermöglicht die Offline-Verwendung der App mit all ihren Funktionen`, en:`Allows offline usage of the app while all functions stay usable`}},
        {name:{de:`Download-Anleitung`, en:`Download guide`}, description:{de:`Enthält eine Download-Anleitung zur Installation als PWA`, en:`Includes a download guide for installation as a PWA and it can be turned off`}},
        {name:{de:`Update Service`, en:`Update service`}, description:{de:`Zeigt verfügbare Updates in den Einstellungen`, en:`Shows available updates in the settings`}}
    ],
    release: '02.10.2024'
};

async function resourcesToCache(resources) {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        resourcesToCache([
            'index.html',
            'style.css',
            'script.js',
            'background.jpg',
            'favicon.ico'
        ])
    )
    sendMessage({from:'SW', version:CACHE_NAME, info:INFO});
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //delete old caches
                    if(cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                }))
        })
    )
})

function sendMessage(message) {
    const channel = new BroadcastChannel('sw_channel');
    console.log(`sending ${message}`);
    channel.postMessage(message);
}

async function cacheFirst(request) {
    const responseFromCache = await caches.match(request);
    if(responseFromCache) return responseFromCache;

    const responseFromNetwork = await fetch(request);

    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, responseFromNetwork.clone());

    return responseFromNetwork;
}

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
})