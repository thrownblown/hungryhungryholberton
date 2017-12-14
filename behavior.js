var map = L.map('map-container', {
    center: [37.7816842, -122.410567],
    zoom: 14
});

var options = {
    weight: 5,
    opacity: 0.4,
    fillOpacity: 0.1
}

L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=ac1365c05d2e415b958f2e0cb541f1ea').addTo(map);

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
var overlay_ctrl = L.control.layers(overlays).addTo(map);
overlay_ctrl.expand()

function resizeFix(){
    var h = $(window).height() - 50;
    $('#map-container').height(h + 'px');
    var w = $('#main').width();
    $('#map-container').width(w + 'px');
    map.invalidateSize();
}

resizeFix();

$(window)
    .resize(function() {
    resizeFix();
});