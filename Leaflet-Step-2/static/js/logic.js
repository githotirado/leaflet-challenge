// Create the map object, center it in the US
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    // layers: [street]
    }
);
  
// Prepare to load the geoJSON data.  Select geodata from past 7 days
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Define variables for our tile layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
})

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);

// Only one base layer can be shown at a time.
var baseMaps = {
  Street: street,
  Topography: topo,
  Satellite: satellite
};

// Pass our map layers into our layer control.
// Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps).addTo(myMap);
// L.control.layers(baseMaps).addTo(myMap);


// Define circle size with earthquake magnitude.
function markerSize(magnitude) {
    // return Math.sqrt(Math.abs(magnitude)) * 60000;
    return magnitude * 20000;
}

function chooseColor(depth) {
    if (depth > 80) return "red";
    else if (depth > 60) return "orange";
    else if (depth > 40) return "yellow";
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
        // console.log(`Magnitude ${geoMag} Depth ${geoDepth} Coord: ${geoLat}, ${geoLon} ${geoTitle}`)
        // console.log(i, geoMag, geoTitle);

        // Define circle markers, their colors and their sizes
        var marker = L.circle([geoLat, geoLon], {
            title: "Earthquakes past 7 days",
            fillColor: chooseColor(geoDepth),
            fillOpacity: 0.8,
            radius: markerSize(geoMag)
        }).addTo(myMap);
        marker.bindPopup(`<h2>${geoTitle}</h2> <hr> <h3>Depth: ${geoDepth} Magnitude: ${geoMag}</h3>`);
        
    }

    // Set up the legend
    // var legend = L.control({ position: "bottomright" });

    // legend.onAdd = function() {
    //     var div = L.DomUtil.create("div", "info legend");
    //     var limits = geojson.options.limits;
    //     var colors = geojson.options.colors;
    //     var labels = [];

    //     var lowerLimit = limits[0];
    //     var upperLimit = limits[limits.length - 1];
    //     var legendInfo = "<h3>Alternative Vehicle Count<br>by County: " + carMake + "</h3>" +
    //         "<div class=\"labels\">" +
    //         "<div class=\"min\">" + lowerLimit + "</div>" +
    //         "<div class=\"max\">" + upperLimit + "</div>" +
    //         "</div>";

    //     div.innerHTML = legendInfo;

    //     limits.forEach(function(limit, index) {
    //         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //     });

    //     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //     return div;
    // };

    // var legend = L.control({position: 'bottomleft'});
    // legend.onAdd = function (map) {

    //     var div = L.DomUtil.create('div', 'info legend');
    //     labels = ['<strong>Categories</strong>'],
    //     categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

    //     for (var i = 0; i < categories.length; i++) {

    //         div.innerHTML += 
    //         labels.push(
    //             '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
    //         (categories[i] ? categories[i] : '+'));

    //     }
    //     div.innerHTML = labels.join('<br>');
    //     return div;
    // };
    // // legend.addTo(map);
    
    // // Add the legend to the map
    // legend.addTo(myMap);
});