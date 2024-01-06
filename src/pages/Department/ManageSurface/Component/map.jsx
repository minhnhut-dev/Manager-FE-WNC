import React, {useContext, useEffect, useRef} from 'react';
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {MAPBOX_ACCESS_TOKEN} from "../../../../utils/config";
import AppContext from "../../../../constanst/Context/appContext";
import "./map.scss";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {axiosService} from "../../../../services/axiosServices";
import {formatGeoJson} from "../../../../services/formatGeoJSON";

const Map = ({onBindingLatLong, handleMovetoFormInput, geoJSON}) => {
  const {currentUser} = useContext(AppContext);

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  const mapContainerRef = useRef(null);
  function detectLatLongByRole() {
    if(currentUser?.role === "WARD_MANAGER") {
      return [currentUser?.ward?.district.longitude, currentUser?.ward?.district.latitude];
    }else if(currentUser?.role === "DISTRICT_MANAGER") {
      return [currentUser?.district?.longitude, currentUser?.district?.latitude]
    }
    else {
      return [106.6297, 10.8231]
    }
  }

  const reverseGeocode = async (lat, lng) => {
    const response = axiosService.get(`/reverse-geocoding/${lat},${lng}`);
    return response;
  }

  useEffect(() => {
    const map =  new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: detectLatLongByRole(),
      maxZoom: 20,
      zoom: 14,
    });

    map.on("load", () => {
      map.addSource('places', {
        'type': 'geojson',
        'data': formatGeoJson(geoJSON)
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
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Use the geocoder's default marker style
      bbox: [106.6297, 10.6958, 106.8413, 10.8765], // Set the bounding box coordinates
      placeholder: "Tìm kiếm địa điểm", // Placeholder text for the search bar,
      autocomplete: true,
    });

    map.addControl(geocoder, "top-left");

    map.on("click",'myDataCircles', (e) => {
      let html = '';
      const { lng, lat } = e.lngLat;
      let furthestFeature = e.features[0].properties;
      html = `
           <div id="popup-content" class="card" style="width: 100%; display: block;">
             <div class="card-header fw-bolder">
               ${furthestFeature?.formAdvertising}
             </div>
             <div class="card-body">
               <h5 class="card-title">Địa chỉ</h5>
               <p class="card-text">${furthestFeature?.full_address}</p>
               <button type="button" class="btn btn-primary btn-sm" id="select-surface">Chọn</button>
             </div>
           </div>`;

        let popup = new mapboxgl.Popup({ offset: 25, className: "custom-popup"})
              .setLngLat([lng, lat])
              .setHTML(html)
              .addTo(map);
          document.querySelector('#select-surface').addEventListener("click", (e) => {
            onBindingLatLong({space: furthestFeature?.id, address: furthestFeature?.full_address});
            handleMovetoFormInput();
            popup.remove();
          })
    });

    map.on('mouseenter', 'myDataCircles', function() {
      map.getCanvas().style.cursor = 'pointer';
    });

    // When the mouse leaves a feature in the 'placesCircles' layer, change the cursor style back to default
    map.on('mouseleave', 'myDataCircles', function() {
      map.getCanvas().style.cursor = '';
    });
  }, []);

  return (
      <div>
        <div id={"map"} ref={mapContainerRef} style={{width: "100%", height: "500px"}}></div>
      </div>
  );
};

export default Map;