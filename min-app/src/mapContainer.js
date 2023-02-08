import React, { useState, useEffect} from 'react'

function MapContainer() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {lat: 59.4121414, lng: 9.0366312},
            zoomControl: Boolean,
            mapTypeControl: Boolean,
            scaleControl: Boolean,
            steetViewControl: Boolean,
            rotateControl: Boolean,
            fullScreenControll: Boolean,
        });

        setMap(map);
    }, []);

    return (
        <div className="map-container">
            <div id="map" style={{ height: '100vh', width: '100%'}} />
        </div>
    )

}

export default MapContainer;