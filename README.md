# leaflet-challenge
Visualizing earthquake data from the USGS.  Map the significant quakes from the last 7 days, indicate magnitude and depth using marker color and size.

# Published Website
https://githotirado.github.io/leaflet-challenge/Leaflet-Step-2/index.html

# Data Sources
From the USGS, I use the most current geoJSON representation of earthquake instances in the past 7 days:
geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

As well from USGS, I use the geoJSON plate tectonics layout for the plate overlay on the map.
tectonicData = "static/data/PB2002_plates.json"

# Observations
Over the past 7 days there have been numerous small quakes in the Alaska region, the western continental US, and along the western Pacific islands.  The tectonics overlay helps one notice that the Pacific plate is the most active in terms of earthquakes; other plates are not as active.  Larger magnitude quakes were concentrated around the Alaska region while the deeper quakes have occurred along the western pacific island regions.

# Operation
The base layers and overlay layers are all operational. For full functionality, the index.html file in the Leaflet-Step-2/ folder is referenced on the web site.  Both the earthquake and tectonic layers can be toggled on the map.
