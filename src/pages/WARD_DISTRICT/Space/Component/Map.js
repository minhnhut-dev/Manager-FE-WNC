import React, {useContext, useEffect, useRef} from 'react';
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {MAPBOX_ACCESS_TOKEN} from "../../../../utils/config";
import AppContext from "../../../../constanst/Context/appContext";
import "./map.scss";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {axiosService} from "../../../../services/axiosServices";
import Swal from "sweetalert2";
const Map = ({onBindingLatLong, handleMovetoFormInput}) => {
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Use the geocoder's default marker style
      bbox: [106.6297, 10.6958, 106.8413, 10.8765], // Set the bounding box coordinates
      placeholder: "Tìm kiếm địa điểm", // Placeholder text for the search bar,
      autocomplete: true,
    });

    map.addControl(geocoder, "top-left");
    let html = '';
    map.on("click", (e) => {
      reverseGeocode(e.lngLat.lat, e.lngLat.lng).then((response) => {
        const {data} = response;
         html = `
          <div id="popup-content" class="card" style="width: 100%; display: block;">
            <div class="card-header fw-bolder">
              Cơ quan chính trị
            </div>
            <div class="card-body">
              <h5 class="card-title">Địa chỉ</h5>
              <p class="card-text">${data?.fullAddress}</p>
              <button type="button" class="btn btn-primary btn-sm" id="select-space">Chọn</button>
            </div>
          </div>`;
        const { lng, lat } = e.lngLat;
         const popup =  new mapboxgl.Popup({ offset: 25, className: "custom-popup"})
              .setLngLat([lng, lat])
              .setHTML(html)
              .addTo(map);
        document.querySelector('#select-space').addEventListener("click", (e) => {
          onBindingLatLong({lat: lat, lng: lng, address: data?.fullAddress, ward: data?.ward.id, district: data?.district?.id});
          handleMovetoFormInput();
          popup.remove();
        })
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Không tìm thấy địa điểm!',
          confirmButtonText: 'Đồng ý',
        })
        console.log(error);
      });
   })
  }, []);
  
  return (
      <div>
        <div id={"map"} ref={mapContainerRef} style={{width: "100%", height: "500px"}}></div>
      </div>
  );
};

export default Map;