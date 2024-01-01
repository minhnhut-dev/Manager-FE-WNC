import React, {useContext, useEffect, useRef} from 'react';
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {MAPBOX_ACCESS_TOKEN} from "../../../../utils/config";
import AppContext from "../../../../constanst/Context/appContext";
import "./map.scss";
const Map = () => {
  const {currentUser} = useContext(AppContext);

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  const mapContainerRef = useRef(null);
  function detectLatLongByRole() {
    if(currentUser?.role === "WARD_MANAGER") {
      return [currentUser?.ward?.longitude, currentUser?.ward?.latitude];
    }else if(currentUser?.role === "DISTRICT_MANAGER") {
      return [currentUser?.district?.longitude, currentUser?.district?.latitude]
    }
    else {
        return [106.6297, 10.8231];}
    }

  useEffect(() => {
   const map =  new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: detectLatLongByRole(),
      maxZoom: 20,
      zoom: 14,
    });

   map.on("click", (e) => {
     const html = `
      <div id="popup-content" class="card" style="width: 100%; display: block;">
        <div class="card-header fw-bolder">
          Cơ quan chính trị
        </div>
        <div class="card-body">
          <h6 class="card-title">Địa chỉ</h6>
          <p class="card-text">Đường Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1</p>
          <button type="button" class="btn btn-primary btn-sm">Chọn</button>
        </div>
      </div>`;

      const { lng, lat } = e.lngLat;
      new mapboxgl.Popup({ offset: 25, className: "custom-popup"})
          .setLngLat([lng, lat])
          .setHTML(html)
          .addTo(map);
   })
  }, []);
  
  return (
      <div>
        <div id={"map"} ref={mapContainerRef} style={{width: "100%", height: "500px"}}></div>
      </div>
  );
};

export default Map;