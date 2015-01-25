Meteor.startup(function() {
	GoogleMaps.load({'libraries': 'places'});
});


Template.map.helpers({
  exampleMapOptions: function() {

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      // We can use the `ready` callback to interact with the map API once the map is ready.
      GoogleMaps.ready('exampleMap', function(map) {

        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
          position: map.options.center,
          map: map.instance
        });

      });

      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

Template.map.rendered = function() {

  // When GoogleMaps is ready
  GoogleMaps.ready('exampleMap', function(map) {

    // Attach autocomplete API to input
    var input = document.getElementById('autocomplete')
    var autocomplete = new google.maps.places.Autocomplete(input)

    // Listen for changes
    google.maps.event.addListener(autocomplete, 'place_changed', function() {

      // Update location
      var place = autocomplete.getPlace()
      var latlng = new google.maps.LatLng(place.geometry.location.k, place.geometry.location.D)
      GoogleMaps.maps.exampleMap.instance.panTo(latlng)

    })

  })

}