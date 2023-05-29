import React, { useState, useEffect } from "react";
import { Rekkevidde } from "./Firebase";
import { radius } from "./Firebase";
import MapContainer from "./mapContainer";

// Legg til alle markørene i en liste også slett innholdet for hver gnag nye markører skal tegnes (for å gjerne gamle markører på kartet)
//const ladestasjonPos = []
export function tegnStasjonsMarkører(map, posisjonTabell, navnTabell) {
    //const map = window.Map;
    //const [map] = useState(null);
    //for (let i = 0; i < posisjonTabell.length; i++) {
    new window.google.maps.Marker({
        position: posisjonTabell[0],
        //map: map,
        title: navnTabell[0]
    });

    //}
}
//const [map, setMap] = useState(null);
/*
function tegnKart(){
    useEffect(() => {
        const lastKart = () => {
            const startKart = new window.google.maps.Map(document.getElementById("map"), {
                mapId: "c09c675c2a08801a",
                zoom: 10,
                center: { lat: 59.4121414, lng: 9.0366312 },
                disableDefaultUI: true,
            });

            setMap(startKart);
        };

        lastKart();
    }, []);
    return map
}
*/

function KartKlikk() {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);

    const klikkKartFunk = (event) => {
        if (map) {



            if (circle) {
                circle.setMap(null); // Fjern tidligere sirkel fra kartet
            }

            if (marker) {
                marker.setMap(null); // Fjern tidligere markør fra kartet
            }

            const nyMarker = new window.google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Start posisjon",
            });

            const nySirkel = new window.google.maps.Circle({
                strokeColor: "#23bd29",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#b2ec73",
                fillOpacity: 0.1,
                map: map,
                center: event.latLng,
                radius: parseInt(radius),
            });

            setMarker(nyMarker);
            setCircle(nySirkel);
        }
    };



    useEffect(() => {
        const lastKart = () => {
            const startKart = new window.google.maps.Map(document.getElementById("map"), {
                mapId: "c09c675c2a08801a",
                zoom: 10,
                center: { lat: 59.4121414, lng: 9.0366312 },
                disableDefaultUI: true,
            });

            setMap(startKart);
        };

        lastKart();
    }, []);


    useEffect(() => {
        let lyttPaaKlikk;
        if (map) {
            lyttPaaKlikk = map.addListener("click", klikkKartFunk);
        }

        return () => {
            if (lyttPaaKlikk) {
                lyttPaaKlikk.remove();
            }

            if (circle) {
                circle.setMap(null); // Fjern sirkelen når komponenten avsluttes
            }

            if (marker) {
                marker.setMap(null); // Fjern markøren når komponenten avsluttes
            }
        };
    }, [map, circle, marker]);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <div id="map" style={{ height: "100%" }} />
        </div>
    );
}



export default KartKlikk;