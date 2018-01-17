/* global google:ignore */

$(() => {

  const $map    = $('.map');
  const itemsData = JSON.parse($('#itemData').html());
  let map       = null;

  initMap();

  function initMap() {
    const latLng = { lat: 53.4578315024, lng: -2.2881655142 };

    map = new google.maps.Map($map.get(0), {
      center: latLng,
      zoom: 6
    });

    loopOverItems();
  }

  function loopOverItems() {
    itemsData.forEach(item => {
      const location = {
        lat: item.latitude,
        lng: item.longitude
      };

      addMarker(location);
    });
  }

  function addMarker(location) {
    new google.maps.Marker({
      position: location,
      map: map
    });
  }

});
