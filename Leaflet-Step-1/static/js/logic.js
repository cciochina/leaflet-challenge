/*
Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. 
Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

HINT the depth of the earth can be found as the third coordinate for each earthquake.

Include popups that provide additional information about the earthquake when a marker is clicked.

Create a legend that will provide context for your map data.

Your visualization should look something like the map above.
*/

// Query urls for the past 7 days of all earthquakes
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Initial function, query the info first
function init(){
  d3.json(queryUrl).then(function(data) {
    // Once I get a response, send the data to the procces_data
    procces_data(data);

  })
}

function get_color(depth){
  // I used this web site to get the colors
  // https://www.google.com/search?client=firefox-b-1-d&q=color+picker

  var color = "rgb(0,255,0)";
  if (depth <= 10) {
    color = "rgb(0,255,0)";
  }
  else if (depth > 10 && depth <= 30) {
    color = "rgb(200,209,67)";
  }
  else if (depth > 30 && depth <= 50) {
    color = "rgb(237,192,95)";
  }
  else if (depth > 50 && depth <= 70) {
    color = "rgb(230,154,83)";
  }
  else if (depth > 70 && depth <= 90) {
    color = "rgb(277,98,43)";
  }
  else if (depth > 90 ) {
    color = "rgb(204,19,6)";
  }
  return color;
}
function get_size(mag){
  //Make size a multiple 5 of magnitude
  return mag*5;
}

function procces_data(data) {
  //console.log(data);
  var markers=[];
  data.features.forEach(function(item) {
    var place = item.properties.place;

    //I need the magnitude for the markers size
    var mag = item.properties.mag;
    var time = item.properties.time;

    // [Lat, Lng]
    var lat_lng = [item.geometry.coordinates[1],item.geometry.coordinates[0]];
    
    //I need depth to set the color for the marker
    var depth = item.geometry.coordinates[2];
    
    // Get the color based on depth
    var color = get_color(depth);
    var size = get_size(mag);

    var marker_properties = {
      radius: size,
      fillColor: color,
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
    //console.log(lat_lng);
    var marker = L.circleMarker(lat_lng,marker_properties).bindPopup(`<h3>${place}</h3><hr><p>${new Date(time)}</p>`);
    markers.push(marker);
  
  });
 // console.log(markers);
 createMap(L.layerGroup(markers));
}

// Create map, reference the last activity from Day_01
function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


init();