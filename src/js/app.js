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
    var item = autocomplete.getPlace();
    console.log(item);
    $placeName.val(item.name);
    $address.val(item.formatted_address);
    $newLat.val(item.geometry.location.lat());
    $newLng.val(item.geometry.location.lng());
  }

  if ($('#name').length !== 0) initAutocomplete();

});









//
//
// $(() => {
//   const $map = $('.map');
//   const $indexMap = $('.index-map');
//   let map = null;
//   let locations = null;
//   let autocomplete = null;
//
//   const $lat = $('#lat-lng').attr('data-lat');
//   const $lng = $('#lat-lng').attr('data-lng');
//   const latLng = { lat: parseFloat($lat), lng: parseFloat($lng) };
//   const $placeName = $('#placeName');
//   const $address = $('#address');
//   const $website = $('#website');
//   const $newLat = $('#lat');
//   const $newLng = $('#lng');
//   const $rating = $('#rating');
//
//   //When text in attraction field has changed fill in the new data for that address
//   function initAutocomplete() {
//     autocomplete = new google.maps.places.Autocomplete($('#autocomplete').get(0));
//     autocomplete.addListener('place_changed', fillInAddress);
//   }
//   function fillInAddress() {
//     var place = autocomplete.getPlace();
//     console.log(place);
//     $placeName.val(place.name);
//     $address.val(place.formatted_address);
//     $website.val(place.website);
//     $newLat.val(place.geometry.location.lat());
//     $newLng.val(place.geometry.location.lng());
//     $rating.val(place.rating);
//   // }
//
//   //On static index page
//   if ($('.static-index').length !== 0) initIndexMap();
//
//   //On show attraction page
//   if ($('.show-attraction').length !== 0) initMap();
//
//   //On new attraction page
//   if ($('.add-attraction').length !== 0) initAutocomplete();
// });
