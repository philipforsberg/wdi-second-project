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

      addMarker(item);
    });
  }

  function addMarker(item) {
    const location = {
      lat: item.latitude,
      lng: item.longitude
    };

    const marker = new google.maps.Marker({
      position: location,
      map: map
    });

    marker.addListener('click', () => {
      createInfoWindow(marker, item);
    });
  }

  function createInfoWindow(marker, item) {
    const infowindow = new google.maps.InfoWindow({
      content: `
        <div class="infowindow">
          <h3>${item.name}</h3>
        </div>
    `
    });

    infowindow.open(map, marker);
  }


  let autocomplete = null;

  const $lat = $('#lat-lng').attr('data-lat');
  const $lng = $('#lat-lng').attr('data-lng');
  const latLng = { lat: parseFloat($lat), lng: parseFloat($lng) };
  const $placeName = $('#placeName');
  const $address = $('#address');
  const $newLat = $('#latitude');
  const $newLng = $('#longitude');


  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete($('#name').get(0));
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    var place = autocomplete.getPlace();
    console.log(place);
    $placeName.val(place.name);
    $address.val(place.formatted_address);
    $newLat.val(place.geometry.location.lat());
    $newLng.val(place.geometry.location.lng());
  }

  if ($('#name').length !== 0) initAutocomplete();
});
