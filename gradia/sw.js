const CACHE_NAME = 'Beta 1.0.6';
const INFO = {
    get description() {
        return {de:`Dieses Update enthält Fehlerbehebungen${this.features.length < 1 ? `.`:` und führt diese neuen Features ein:`}`, en:`This update provides bug fixes${this.features.length < 1 ? `.`:` and introduces these new features:`}`}
    },
    features: [
        {name:{de:`Automatische Einstellungs-Speicherung`, en:`Auto-saving settings`}, description:{de:`Änderungen an den Einstellungen werden direkt gespeichert`, en:`Changes to the settings are saved automatically`}},
    ],
    release: new Date(Date.UTC(2024, 10, 18))
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
            '/favicon.ico'
        ])
    )
    self.skipWaiting();
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
