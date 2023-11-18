/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Maps() {
  useEffect(() => {
    const map = L.map('map').setView([47.3220, 5.0415], 12);

    const fontAwesomeIcon = L.divIcon({
        html: '<i class="fa fa-map-marker fa-4x" style="color: #db0925"></i>',
        className: 'myDivIcon',
        
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add a marker to the map
    L.marker([47.35149885949109, 4.998679339135277 ], {icon: fontAwesomeIcon}).addTo(map)
    .bindPopup('DAIX')
    .openPopup();

    L.marker([47.30747259581213, 5.069857261308844 ], {icon: fontAwesomeIcon}).addTo(map)
    .bindPopup('PREJOCES')
    .openPopup();
    

    L.marker([47.3260845998421, 5.041723661691503 ], {icon: fontAwesomeIcon}).addTo(map)
    .bindPopup('TREMOUILLE')
    .openPopup();
    

    L.marker([47.35307504238675, 5.067324174661655 ], {icon: fontAwesomeIcon}).addTo(map)
    .bindPopup('ARDENNES')
    .openPopup();
    
    





  }, []);
      
   

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
}

export default Maps;