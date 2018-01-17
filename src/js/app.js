/* global google:ignore */

$(() => {

  const $map    = $('.map');
  let map       = null;
  // let locations = null;

  initMap();

  function initMap() {
    const latLng = { lat: 53.4578315024, lng: -2.2881655142 };

    map = new google.maps.Map($map.get(0), {
      center: latLng,
      zoom: 6
    });
  }

  function getGrounds() {
    const latitude = parseFloat($('.lat').text());
    const longitude = parseFloat($('.lng').text());

    console.log(latitude);
    console.log(longitude);
    addMarker({
      lat: latitude,
      lng: longitude
    });
  }

  getGrounds();

  function addMarker(location) {
    // const latLng = { lat: location.lat, lng: location };
    const marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

});
