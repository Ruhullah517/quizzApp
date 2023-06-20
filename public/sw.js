console.log("sw File in public");

const CACHE_NAME = "version-1";

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll([

                    "/static/js/bundle.js",
                    "/manifest.json",
                    "/https://fonts.googleapis.com/css2?family=Catamaran:wght@700&family=Fascinate+Inline&display=swap",
                    "/favicon.icon",
                    "/logo192.png",
                    "/images/photo-1440778303588-435521a205bc.jpg",
                    "https://fonts.gstatic.com/s/fascinateinline/v22/jVyR7mzzB3zc-jp6QCAu60poNqIy5grIfA.woff2",
                    "https://fonts.gstatic.com/s/catamaran/v18/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPJ_a5a7duw.woff2",
                    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple",
                    "/index.html",
                    "/",
                ]);
            })
    )
});


this.addEventListener('fetch', function (event) {
    // console.log("url", event.request.url);


    if (!navigator.onLine) {

        if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
            event.waitUntil(
                this.registration.showNotification("INternet", {
                    body: "Internet Connection is Lost",
                })
            )

        }

        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    let reqURL = event.request.clone();
                    return fetch(reqURL);
                }
                )
        );
    }
});
