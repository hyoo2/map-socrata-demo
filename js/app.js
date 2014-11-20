/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

/*
Hint for HW 8:
string..  "cameralabel" = string
cameralabel.toLowerCase().indexOf(string)
index of both arrays same, can use to make marker null. setMarker null
    data.forEach(function(station, itemIndex)
 */

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 41.8369,
        lng: -87.6847
    }; // center lat & lng

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    }); // map

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    // Angular = .succes, .error, .finally
    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {
            stations = data;

            data.forEach(function(station) {
                var marker = new google.maps.Marker( {
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                }); // marker
                markers.push(marker);

                // infoWindow
                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + station.station_name + '</h2>';
                    html += '<p>' + station.street_address + '</p>';

                    infoWindow.setContent(html);
                    infoWindow.open(map, this); // this = marker
                });
            }); // for each loop on array stations
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        });
}); // doc ready function