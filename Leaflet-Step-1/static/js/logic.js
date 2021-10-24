// Create the map object, center it in the US
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
    }
);
  
// Prepare to load the geoJSON data.  Select geodata from past 7 days
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Define marker size based on the magnitude of the earthquake
function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 50;
}

// Retrieve the geoJSON dataset using d3 and add markers and popups
d3.json(geoData).then(function(data) {
    console.log([data]);

    // Parse through the geoJSON data and add the markers
    for (let i = 0; i < data["features"].length; i++) {
        var geoLon   = data["features"][i]["geometry"]["coordinates"][0];
        var geoLat   = data["features"][i]["geometry"]["coordinates"][1];
        var geoDepth = data["features"][i]["geometry"]["coordinates"][2];
        var geoMag   = data["features"][i]["properties"]["mag"];
        var geoTitle = data["features"][i]["properties"]["title"];
        // console.log(`Magnitude ${geoMag} Depth ${geoDepth} Coord: ${geoLat}, ${geoLon} ${geoTitle}`)
        console.log(i, geoMag, geoTitle);
        // Define markers and their sizes
        var marker = L.circle([geoLat, geoLon], {
            title: "Earthquakes past 7 days",
            radius: markerSize(geoMag)
        }).addTo(myMap);
        marker.bindPopup(`<h2>${geoTitle}</h2> <hr> <h3>Depth: ${geoDepth} Magnitude: ${geoMag}</h3>`);
        
        // L.marker([geoLat, geoLon])
        //     .bindPopup(`<h2>${geoTitle}</h2> <hr> <h3>Depth: ${geoDepth} Magnitude: ${geoMag}</h3>`)
        //     .addTo(myMap);
    }
});