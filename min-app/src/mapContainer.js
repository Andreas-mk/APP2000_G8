import React, { useState, useEffect } from "react";
//import AdvancedMarkerElement from "google/maps";

function MapContainer() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      mapId: "c09c675c2a08801a",
      zoom: 10,
      center: { lat: 59.4121414, lng: 9.0366312 },
      disableDefaultUI: true,
    });

    setMap(map);
  }, []);

  const marker = {
    hovedpunkt: {
      center: { lat: 59.4121414, lng: 9.0366312 },
      pop: 335,
    },
  };
  /*   
       // Default markør, brukers utgangspunkt .
       new window.google.maps.AdvancedMarkerElement({
         map,
         position: map.center, // bytt ut med museklikk
         title: "Startpunkt",
       }); 
     */
  new window.google.maps.Marker({
    position: { lat: 59.4121414, lng: 9.0366312 },
    map,
    title: "Startpunkt",
  });


  // Brukers utgangspunkt
  for (const mark in marker) {
    const markerCircle = new window.google.maps.Circle({
      strokeColor: "#23bd29",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#b2ec73",
      fillOpacity: 0.1,
      map,
      center: marker[mark].center,
      radius: Math.sqrt(marker[mark].pop) * 1000,
    });
  }




  // Retursirkel
  for (const mark in marker) {
    const markerCircle = new window.google.maps.Circle({
      strokeColor: "#3287da",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#8fd5ff",
      fillOpacity: 0.1,
      map,
      center: marker[mark].center,
      radius: (Math.sqrt(marker[mark].pop) * 1000) / 2,
    });
  }

  // Ladestasjonsirkel
  for (const mark in marker) {
    const markerCircle = new window.google.maps.Circle({
      strokeColor: "#c10417",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#e26078",
      fillOpacity: 0.1,
      map,
      center: { lat: 59.3870756, lng: 9.1547351 },
      radius: (Math.sqrt(marker[mark].pop) * 1000),
    });
  }

  return (
    <div className="map-container">
      <markerCircle />
      <div id="map" style={{ height: "100vh", width: "100%" }} />
    </div>
  );
}

export default MapContainer;
