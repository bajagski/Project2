
// Function to determine marker size based on acres
function markerSize(acres) {
  return acres ;
}

// Use local data
var link = "static/nat_park_attednce_data.json";

var parkMarkers = [];

d3.json(link, function(data){
// Loop through locations and create city and state markers

  // parse data
  data.forEach(function(d) {
    d.visitors = +d.visitors;
    d.area.acres = +d.area.acres;
    

for (var i = 0; i < data.length; i++) { 

  // converts string to integer
  // data[i].visitors = data[+i].visitors;

  console.log(d.visitors);

  // Setting the marker radius for the state by passing population into the markerSize function
  parkMarkers.push(
    L.circle((data[i].coordinates.latitude, data[i].coordinates.longitude), {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
      // radius: markerSize(d.visitors)
      radius: 100
    })
  );
}
  
  })
})
// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

// Create two separate layer groups: one for acres and one for # of visitors (or popup data)
var parks = L.layerGroup(parkMarkers);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Satellite Map": satellitemap,
};

// Create an overlay object
var overlayMaps = {
  "National Park": parks,
};

// Define a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, parks]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
