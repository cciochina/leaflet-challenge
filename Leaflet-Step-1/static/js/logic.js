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

function procces_data(data) {
  console.log(data);
}

init();