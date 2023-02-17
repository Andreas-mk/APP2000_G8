import React, { useState, useEffect } from "react";

function MapContainer() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
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

  for (const mark in marker) {
    const markerCircle = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "FF00000",
      fillOpcaity: 0.15,
      map,
      center: marker[mark].center,
      radius: Math.sqrt(marker[mark].pop) * 1000,
    });
  }
  // Retursirkel
  for (const mark in marker) {
    const markerCircle = new window.google.maps.Circle({
      //strokeColor: "#FF2",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "FFFF00",
      fillOpcaity: 0.15,
      map,
      center: { lat: 59.3870756, lng: 9.1547351 },
      radius: (Math.sqrt(marker[mark].pop) * 1000) / 2,
    });
  }

  return (
    <div className="map-container">
      <div id="map" style={{ height: "100vh", width: "100%" }} />
    </div>
  );
}

export default MapContainer;
