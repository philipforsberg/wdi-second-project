/* global google:ignore */

$(() => {

  const $map    = $('.map');
  let map       = null;
  // let locations = null;

  initMap();

  function initMap() {
    const latLng = { lat: 51.515213, lng: -0.072331 };

    map = new google.maps.Map($map.get(0), {
      center: latLng,
      zoom: 14
    });
  }


  function addMarker(location) {
    const latLng = { lat: location.lat, lng: location.lon };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

});
