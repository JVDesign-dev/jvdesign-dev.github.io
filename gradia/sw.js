const CACHE_NAME = 'Beta 1.0.8';
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
    sendLogData('updated');
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




//----- SENDS LOG DATA -----//

async function sendLogData(logType) {
    const versionData = {
        app_name: "gradia",
        version: buildVersion,
        new_users: 0,
        standalone_apps: 0,
        updated_apps: 0
    };

    switch(logType) {
        case 'new_user':
            versionData.new_users ++;
            break;
        case 'standalone':
            versionData.standalone_apps ++;
            break;
        case 'updated':
            versionData.updated_apps ++;
            break;
        default:
            return;
    }

    try {
        const response = await fetch('https://logs.jvdesign.workers.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(versionData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Response from worker:', result);
    } 
    catch (error) {
        console.error('Failed to send version data:', error);
    }
}