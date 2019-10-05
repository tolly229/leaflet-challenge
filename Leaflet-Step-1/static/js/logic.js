var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
//   layers: [streetmap, earthquakes]
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoidG9sbHkyMjkiLCJhIjoiY2swdG03eHg3MGV2YzNjcXN3bzBlbTFkayJ9.4EmPZLnOhIQFi9uBfTGTDQ"
}).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

d3.json(queryUrl, function (data) {
  createFeatures(data);
});

// L.control.layers(null, overlays).addTo(myMap);
// var info = L.control({
//     position: "bottomright"
//   });
//   info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//         var maglabel = ["5", "4.5", "4", "3", "<3"];
//         var magcolor = ["red", "orange", "yellow", "greenyellow", "green"]
//         for (var i = 0; i < maglabel.length; i ++){
//             div.innerHTML +=
//             "<i style = 'background: " + magcolor[i] + "'></i>" + maglabel[i] + "<br>"
//         }
//     return div;
//   };
//   info.addTo(myMap);


function createFeatures(earthquakeData) {
 console.log(earthquakeData);
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  function colorpicker(mag) {
    if (mag >= 5){
        return "red"
    }else if (mag >= 4.5){
        return "orange"
    }else if (mag >= 4){
        return "yellow"
    }else if (mag >= 3) {
        return "greenyellow"
    }else {
        return "green"
    };
  }
  
  function radiussize(mag) {
    if (mag >= 5){
        return mag*3
    }else if (mag >= 3){
        return mag*2.5
    }else {
        return mag*2
    };
  }
 
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,{
            radius: radiussize(feature.properties.mag),
            fillColor: colorpicker(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }
  });
  console.log(earthquakes);
  earthquakes.addTo(myMap);
}


// L.control.layers(null, overlays).addTo(myMap);
// // var info = L.control({
// //   position: "bottomright"
// // });
// // info.onAdd = function() {
// //   var div = L.DomUtil.create("div", "legend");
// //   return div;
// // };
// // info.addTo(map);

