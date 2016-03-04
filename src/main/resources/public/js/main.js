//TODO: Mover este bloco para um js separado
var map;
var circle;
var marker;
function initMap() {
    //TODO: mexer nos controles
    //TODO: Observar http://www.gramfeed.com/instagram/map#/-8.0611,-34.8717/1000/-
    var mapDiv = document.getElementById('map');
    var mapOpts = {
        center: new google.maps.LatLng(-8.06, -34.88), // Fallback - centralizar mapa no recife antigo
        zoom: 14
    };
    //Solicitar localizaçã odo navegador
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }

    map = new google.maps.Map(mapDiv, mapOpts);

    map.addListener('click', function(event) {
        placeMarker(event.latLng);
    });
}
function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
    map.setCenter(location);
    marker = marker;
    //TODO: abaixar tela de loading
    //TODO: chamar ajax instagram
}
function drawCircle(location) {
    /*
    //https://develosetMap(map)pers.google.com/maps/documentation/javascript/examples/marker-remove
    circle.setMap(null);
    circle = new google.maps.Circle({
        strokeColor: '#006600',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: '#006600',
        fillOpacity: 0.3,
        map: map,
        center: markers[0].getPosition(),
        radius: 1000
  });*/
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    markers.foreach(function(marker) {
        marker.setMap(map);
    })
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}