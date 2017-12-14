document.addEventListener("DOMContentLoaded", function(event) {

    var thumbnailElement = document.getElementById("smart_thumbnail");

    thumbnailElement.addEventListener("click", function() {

        var thumb_click = confirm("I see you there, clickin that img!");

        if (thumb_click){
            thumbnailElement.className = "";
        } else {
            thumbnailElement.className = "small";
        }

        if (thumbnailElement.className == "") {
            thumbnailElement.className = "small";
        } else {
            thumbnailElement.className = "";
        }
    });

    var map = L.map('map-container', {
        center: [37.7816842, -122.410567],
        zoom: 14
    });

    var map_layer = 'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=ac1365c05d2e415b958f2e0cb541f1ea';
    L.tileLayer(map_layer).addTo(map);

    var options = {
        weight: 5,
        opacity: 0.4,
        fillOpacity: 0.1
    };

    var iso_layer_5 = new L.geoJson(isochrone5, options);
    var iso_layer_10 = new L.geoJson(isochrone10, options);
    var iso_layer_15 = new L.geoJson(isochrone15, options);
    var iso_layer_20 = new L.geoJson(isochrone20, options);

    overlays = {
        "5 Min Walk" : iso_layer_5, 
        "10 Min Walk" : iso_layer_10,
        "15 Min Walk" : iso_layer_15,
        "20 Min Walk" : iso_layer_20
    };

    var overlay_ctrl = new L.control.layers(overlays).addTo(map);
    overlay_ctrl.expand();

    var restaurants = yelp_results.businesses;
    for (var i = 0; i < restaurants.length; i ++) {
        var coords = restaurants[i].coordinates;
        coords = [parseFloat(coords.latitude), parseFloat(coords.longitude)];
        var marker = L.marker(coords).addTo(map);

        var popupContent = "<p>" + restaurants[i].name +
            "<br/>" + restaurants[i].location.address1 +
            "<br/>" + restaurants[i].display_phone  +
            "<br/><a href='" + restaurants[i].url  + "' target='_blank'>Yelp</a>" +
            "<br/>" + restaurants[i].rating  + " stars" +
            "<br/>" + restaurants[i].price + "</p>";

        marker.bindPopup(popupContent);
    }


    function resizeFix(){
        // var h = $(window).height() - 150 ;
        // // var h = $('#main').height() - 50 ;
        // $('#main').height(h + 'px');
        // $('#map-container').height(h + 'px');
        // var w = $('#main').width();
        // $('#map-container').width(w + 'px');
        map.invalidateSize();
    }

    resizeFix();

    $(window)
        .resize(function() {
        resizeFix();
    });
});
