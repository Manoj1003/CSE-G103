// Initialize map
let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    // Get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);

            // Add user marker
            const userMarker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: {
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    scaledSize: new google.maps.Size(32, 32)
                }
            });
        });
    } else {
        console.error("Geolocation is not supported by your browser.");
    }

    // Search box
    const searchBox = new google.maps.places.Autocomplete(document.getElementById('search-box'));
    searchBox.bindTo('bounds', map);

    searchBox.addListener('place_changed', function() {
        const place = searchBox.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
        }
    });
}

initMap();
