import React, { useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { geoJson } from '../../utils/mock/geoJson';
import {MAPBOX_ACCESS_TOKEN} from '../../utils/config';
import "./map.css";

function Map() {
  console.log("Load map")
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [ 106.7008, 10.7769],
      maxZoom: 20,
      zoom: 18,

    });
    map.on("load", () => {
      map.addSource('places', {
        'type': 'geojson',
        'data': geoJson
      });

      map.addLayer({
        id: 'myDataCircles',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-radius': 15,
          "circle-color": "#11b4da",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        }
      });
      
      // Add a new layer to the map for the labels
      map.addLayer({
        id: 'myDataLabels',
        type: 'symbol',
        source: 'places',
        layout: {
          'text-field': 'QC',
          'text-size': 9
        }
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        "bottom-right"
      );
      map.on('mouseenter', 'myDataCircles', function() {
        map.getCanvas().style.cursor = 'pointer';
      });
      
      // When the mouse leaves a feature in the 'placesCircles' layer, change the cursor style back to default
      map.on('mouseleave', 'myDataCircles', function() {
        map.getCanvas().style.cursor = '';
      });
    })
  }, []);

  return (
    <div id="map" ref={mapContainerRef} />
  );
}

export default Map;