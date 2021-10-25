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

// Define circle size with earthquake magnitude.
function markerSize(magnitude) {
    // return Math.sqrt(Math.abs(magnitude)) * 60000;
    return magnitude * 20000;
}

function chooseColor(depth) {
    if (depth > 80) return "red";
    else if (depth > 60) return "tomato";
    else if (depth > 30) return "orange";
    else if (depth > 10) return "yellow";
    else return "lightgreen";
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
        var geoDate  = Date(data["features"][i]["properties"]["time"]);
        // console.log(`Magnitude ${geoMag} Depth ${geoDepth} Coord: ${geoLat}, ${geoLon} ${geoTitle}`)
        // console.log(i, geoMag, geoTitle);

        // Define circle markers, their colors and their sizes
        var marker = L.circle([geoLat, geoLon], {
            title: "Earthquakes past 7 days",
            fillColor: chooseColor(geoDepth),
            fillOpacity: 0.8,
            radius: markerSize(geoMag)
        }).addTo(myMap);
        marker.bindPopup(`<h2>${geoTitle}</h2> <hr> 
                            <h3>Time: ${geoDate}</h3>
                            <h3>Depth: ${geoDepth} Magnitude: ${geoMag}</h3>`);
        
    }

    // Set up the legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
    
        var div = L.DomUtil.create('div', 'info legend');
        // magnitudes = [0, 1, 2, 3, 4, 5];
        magnitudes = [0, 10, 30, 60, 80];
    
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style="background: ' + chooseColor(magnitudes[i] + 1) + '"></i> ' + 
        + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
        }
    
        return div;
    };
    
    legend.addTo(myMap);
});