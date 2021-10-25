# leaflet-challenge
Visualizing earthquake data from USGS

# Data Sources
From the USGS, I am using the geoJSON representation of earthquake instances in the past 7 days from the present:
geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

As well from USGS, I downloaded the geoJSON plate tectonics layout for the plate overlay on the map.  No API key was required.
tectonicData = "static/data/PB2002_plates.json"

# Observations
Over the past 7 days there have been numerous small quakes in the Alaska region, the western continental US, and along the western Pacific islands.  The tectonics overlay helps one notice that the Pacific plate is the most active in terms of earthquakes; other plates are not as active.  Larger magnitude quakes were concentrated around the Alaska region while the deeper quakes have occurred along the western pacific island regions.

# Operation
The base layers and overlay layers are all operational. For all functions, use the index.html file in the Leaflet-Step-2/ folder.  One base layer can be selected at a time, but both the earthquake and tectonic layers can be toggled.
